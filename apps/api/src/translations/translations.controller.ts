import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common'
import { TranslationsService } from './translations.service'
import { CreateTranslationDto } from './dto/create-translation.dto'
import { TranslationStatus } from './enums/translation-status.enum'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User } from '../decorators/user.decorator'
import { TranslationStatsQueryDto } from './dto/translation-stats.dto'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { ProjectRole } from '../projects/dto/project-member.dto'
import {
  ImportTranslationsDto,
  ExportTranslationsDto,
} from './dto/translation-import-export.dto'

@Controller('translations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get('key/:keyId')
  findByKey(@Param('keyId') keyId: string) {
    return this.translationsService.findByKey(+keyId)
  }

  @Post()
  create(
    @Body() createTranslationDto: CreateTranslationDto,
    @User() user: { id: number }
  ) {
    return this.translationsService.create({
      ...createTranslationDto,
      creatorId: user.id,
    })
  }

  @Put(':id/status')
  @Roles(ProjectRole.OWNER, ProjectRole.MANAGER, ProjectRole.MEMBER)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TranslationStatus
  ) {
    return this.translationsService.updateStatus(+id, status)
  }

  @Get('stats')
  async getStats(@Query() query: TranslationStatsQueryDto) {
    return this.translationsService.getProjectStats(
      query.projectId,
      query.namespaceId
    )
  }

  @Post('import')
  @Roles(ProjectRole.OWNER, ProjectRole.MANAGER)
  async importTranslations(
    @Body() importDto: ImportTranslationsDto,
    @User() user: { id: number }
  ) {
    return this.translationsService.importTranslations(importDto, user.id)
  }

  @Get('export')
  async exportTranslations(@Query() query: ExportTranslationsDto) {
    return this.translationsService.exportTranslations(query)
  }
}
