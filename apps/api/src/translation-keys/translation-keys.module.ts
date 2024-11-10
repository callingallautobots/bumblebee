import { Module } from '@nestjs/common'
import { TranslationKeysService } from './translation-keys.service'
import { TranslationKeysController } from './translation-keys.controller'
import { PrismaService } from '@bumblebee/database'

@Module({
  controllers: [TranslationKeysController],
  providers: [TranslationKeysService, PrismaService],
  exports: [TranslationKeysService],
})
export class TranslationKeysModule {}
