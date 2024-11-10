import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { ProjectsController } from './projects.controller'
import { PrismaService } from '@bumblebee/database'

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
