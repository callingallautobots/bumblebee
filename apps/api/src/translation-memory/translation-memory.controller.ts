import { Controller, Post, Body } from '@nestjs/common'
import { TranslationMemoryService } from './translation-memory.service'
import { QueryTranslationMemoryDto } from './dto/query-translation-memory.dto'

@Controller('translation-memory')
export class TranslationMemoryController {
  constructor(
    private readonly translationMemoryService: TranslationMemoryService
  ) {}

  @Post('query')
  async querySimilarTranslations(@Body() queryDto: QueryTranslationMemoryDto) {
    const results = await this.translationMemoryService.findSimilarTranslations(
      {
        content: queryDto.content,
        sourceLocale: queryDto.sourceLocale,
        targetLocale: queryDto.targetLocale,
        projectId: queryDto.projectId,
      }
    )

    return { results }
  }
}
