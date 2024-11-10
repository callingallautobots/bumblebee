import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { TranslationStats } from './dto/translation-stats.dto'
import { TranslationStatus } from './enums/translation-status.enum'
import {
  ImportTranslationsDto,
  ExportTranslationsDto,
} from './dto/translation-import-export.dto'
import { ImportValidatorService } from './services/import-validator.service'
import { ImportResult } from './dto/import-validation.dto'

@Injectable()
export class TranslationsService {
  constructor(
    private prisma: PrismaService,
    private importValidator: ImportValidatorService
  ) {}

  async findByKey(translationKeyId: number) {
    return this.prisma.translation.findMany({
      where: { translationKeyId },
      include: {
        creator: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async create(data: {
    content: string
    locale: string
    translationKeyId: number
    creatorId: number
  }) {
    return this.prisma.translation.create({
      data,
      include: {
        creator: true,
      },
    })
  }

  async updateStatus(
    id: number,
    status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'REJECTED'
  ) {
    return this.prisma.translation.update({
      where: { id },
      data: {
        status,
        version: {
          increment: 1,
        },
      },
    })
  }

  async getProjectStats(
    projectId: number,
    namespaceId?: number
  ): Promise<TranslationStats> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        namespaces: {
          include: {
            keys: {
              include: {
                translations: true,
              },
            },
          },
        },
      },
    })

    if (!project) {
      throw new Error('Project not found')
    }

    const namespaces = namespaceId
      ? project.namespaces.filter((n) => n.id === namespaceId)
      : project.namespaces

    const translations = namespaces.flatMap((n) =>
      n.keys.flatMap((k) => k.translations)
    )

    const stats: TranslationStats = {
      total: translations.length,
      draft: translations.filter((t) => t.status === TranslationStatus.DRAFT)
        .length,
      review: translations.filter((t) => t.status === TranslationStatus.REVIEW)
        .length,
      approved: translations.filter(
        (t) => t.status === TranslationStatus.APPROVED
      ).length,
      rejected: translations.filter(
        (t) => t.status === TranslationStatus.REJECTED
      ).length,
      completion: 0,
      byLocale: {},
    }

    // 计算完成率
    stats.completion = Math.round((stats.approved / (stats.total || 1)) * 100)

    // 按语言统计
    const locales = [...project.targetLocales, project.sourceLocale]
    locales.forEach((locale) => {
      const localeTranslations = translations.filter((t) => t.locale === locale)
      stats.byLocale[locale] = {
        total: localeTranslations.length,
        draft: localeTranslations.filter(
          (t) => t.status === TranslationStatus.DRAFT
        ).length,
        review: localeTranslations.filter(
          (t) => t.status === TranslationStatus.REVIEW
        ).length,
        approved: localeTranslations.filter(
          (t) => t.status === TranslationStatus.APPROVED
        ).length,
        rejected: localeTranslations.filter(
          (t) => t.status === TranslationStatus.REJECTED
        ).length,
        completion: 0,
      }
      stats.byLocale[locale].completion = Math.round(
        (stats.byLocale[locale].approved /
          (stats.byLocale[locale].total || 1)) *
          100
      )
    })

    return stats
  }

  async importTranslations(
    data: ImportTranslationsDto,
    userId: number
  ): Promise<ImportResult> {
    // 验证导入数据
    const { validatedData, errors } =
      await this.importValidator.validateImport(data)

    if (errors.length > 0) {
      return {
        success: false,
        total: data.translations.length,
        created: 0,
        updated: 0,
        failed: errors.length,
        errors,
      }
    }

    const results = {
      success: true,
      total: validatedData.length,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [],
    }

    try {
      // 批量处理验证通过的数据
      await this.prisma.$transaction(async (prisma) => {
        for (const item of validatedData) {
          if (!item.isValid) continue

          const namespace = await prisma.namespace.upsert({
            where: {
              projectId_name: {
                projectId: data.projectId,
                name: item.namespace,
              },
            },
            create: {
              name: item.namespace,
              projectId: data.projectId,
            },
            update: {},
          })

          const key = await prisma.translationKey.upsert({
            where: {
              namespaceId_key: {
                namespaceId: namespace.id,
                key: item.key,
              },
            },
            create: {
              key: item.key,
              namespaceId: namespace.id,
            },
            update: {},
          })

          const existingTranslation = await prisma.translation.findUnique({
            where: {
              translationKeyId_locale: {
                translationKeyId: key.id,
                locale: item.locale,
              },
            },
          })

          if (existingTranslation) {
            await prisma.translation.update({
              where: { id: existingTranslation.id },
              data: {
                content: item.content,
                version: { increment: 1 },
              },
            })
            results.updated++
          } else {
            await prisma.translation.create({
              data: {
                content: item.content,
                locale: item.locale,
                translationKeyId: key.id,
                creatorId: userId,
                status: 'DRAFT',
              },
            })
            results.created++
          }
        }
      })
    } catch (error: unknown) {
      throw new BadRequestException(
        'Import failed: ' + (error as Error).message
      )
    }

    return results
  }

  async exportTranslations(data: ExportTranslationsDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: data.projectId },
      include: {
        namespaces: {
          where: data.namespaceId ? { id: data.namespaceId } : undefined,
          include: {
            keys: {
              include: {
                translations: {
                  where: {
                    locale: data.locales ? { in: data.locales } : undefined,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!project) {
      throw new BadRequestException('Project not found')
    }

    const exportData = project.namespaces.flatMap((namespace) =>
      namespace.keys.flatMap((key) =>
        key.translations.map((translation) => ({
          namespace: namespace.name,
          key: key.key,
          locale: translation.locale,
          content: translation.content,
          status: translation.status,
        }))
      )
    )

    return exportData
  }
}
