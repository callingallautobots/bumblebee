import { Module } from '@nestjs/common'
import { NamespacesService } from './namespaces.service'
import { PrismaService } from '@bumblebee/database'

@Module({
  providers: [NamespacesService, PrismaService],
  exports: [NamespacesService],
})
export class NamespacesModule {}
