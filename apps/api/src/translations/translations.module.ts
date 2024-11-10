import { Module } from '@nestjs/common'
import { TranslationsService } from './translations.service'
import { TranslationsController } from './translations.controller'
import { ImportValidatorService } from './services/import-validator.service'
import { PrismaService } from '@bumblebee/database'

@Module({
  controllers: [TranslationsController],
  providers: [TranslationsService, ImportValidatorService, PrismaService],
  exports: [TranslationsService],
})
export class TranslationsModule {}
