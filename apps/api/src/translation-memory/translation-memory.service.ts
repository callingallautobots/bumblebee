import { PrismaService, Prisma } from '@bumblebee/database'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TranslationMemoryService {
  // 相似度匹配的阈值
  private readonly SIMILARITY_THRESHOLD = 0.6

  constructor(private prisma: PrismaService) {}

  async findSimilarTranslations(params: {
    content: string
    sourceLocale: string
    targetLocale: string
    projectId?: number
  }) {
    const { content, sourceLocale, targetLocale, projectId } = params

    // 首先找到源语言的相似翻译
    const similarSourceTranslations = await this.prisma.$queryRaw(Prisma.sql`
      WITH similar_sources AS (
        SELECT DISTINCT ON (tk.id)
          t.id,
          t.content as source_content,
          tk.id as translation_key_id,
          similarity(t.content, ${content}) as similarity
        FROM "Translation" t
        JOIN "TranslationKey" tk ON t.translation_key_id = tk.id
        JOIN "Namespace" n ON tk.namespace_id = n.id
        WHERE 
          t.locale = ${sourceLocale}
          ${projectId ? Prisma.sql`AND n.project_id = ${projectId}` : Prisma.sql``}
          AND similarity(t.content, ${content}) > ${this.SIMILARITY_THRESHOLD}
        ORDER BY tk.id, similarity DESC
      )
      SELECT 
        ss.translation_key_id,
        ss.source_content,
        t.content as target_content,
        ss.similarity
      FROM similar_sources ss
      JOIN "Translation" t ON t.translation_key_id = ss.translation_key_id
      WHERE t.locale = ${targetLocale}
      ORDER BY ss.similarity DESC
      LIMIT 5
    `)

    return similarSourceTranslations
  }
}
