import { Injectable } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { ImportTranslationsDto } from '../dto/translation-import-export.dto'
import {
  ValidatedTranslation,
  ImportValidationError,
} from '../dto/import-validation.dto'
import { TranslationStatus } from '../enums/translation-status.enum'

@Injectable()
export class ImportValidatorService {
  constructor(private prisma: PrismaService) {}

  async validateImport(data: ImportTranslationsDto): Promise<{
    validatedData: ValidatedTranslation[]
    errors: ImportValidationError[]
  }> {
    const project = await this.prisma.project.findUnique({
      where: { id: data.projectId },
      include: {
        namespaces: true,
      },
    })

    if (!project) {
      throw new Error('Project not found')
    }

    const errors: ImportValidationError[] = []
    const validatedData: ValidatedTranslation[] = []

    await Promise.all(
      data.translations.map(async (item, index) => {
        const rowErrors: string[] = []

        // 验证键名格式
        if (!/^[a-zA-Z0-9_.-]+$/.test(item.key)) {
          rowErrors.push('Invalid key format')
        }

        // 验证命名空间格式
        if (!/^[a-zA-Z0-9_.-]+$/.test(item.namespace)) {
          rowErrors.push('Invalid namespace format')
        }

        // 验证区域设置
        if (!project.targetLocales.includes(item.locale)) {
          rowErrors.push('Invalid locale')
        }

        // 验证内容长度
        if (item.content.length > 5000) {
          rowErrors.push('Content too long')
        }

        // 检查重复键
        const existingKey = await this.prisma.translationKey.findFirst({
          where: {
            key: item.key,
            namespace: {
              name: item.namespace,
              projectId: project.id,
            },
          },
        })

        if (existingKey) {
          rowErrors.push('Duplicate key')
        }

        if (rowErrors.length > 0) {
          errors.push({
            row: index + 1,
            field: 'key',
            message: rowErrors.join(', '),
          })
        } else {
          const validatedItem: ValidatedTranslation = {
            ...item,
            status: TranslationStatus.DRAFT,
            isValid: true,
            errors: [],
          }
          validatedData.push(validatedItem)
        }
      })
    )

    return {
      validatedData,
      errors,
    }
  }
}
