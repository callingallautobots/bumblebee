import { Module } from '@nestjs/common'
import { TranslationMemoryService } from './translation-memory.service'
import { TranslationMemoryController } from './translation-memory.controller'
import { PrismaService } from '@bumblebee/database'

@Module({
  controllers: [TranslationMemoryController],
  providers: [TranslationMemoryService, PrismaService],
  exports: [TranslationMemoryService],
})
export class TranslationMemoryModule {}
