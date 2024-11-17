import { Module } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { ProjectsModule } from './projects/projects.module'
import { TranslationsModule } from './translations/translations.module'
import { NamespacesModule } from './namespaces/namespaces.module'
import { AuthModule } from './auth/auth.module'
import { TranslationKeysModule } from './translation-keys/translation-keys.module'
import { TagsModule } from './tags/tags.module'
import { RolesGuard } from './auth/guards/roles.guard'
import { APP_GUARD } from '@nestjs/core'
import { CommentsModule } from './comments/comments.module'
import { HealthModule } from './health/health.module'
import { LoggerModule } from './logger/logger.module'
import { TranslationMemoryModule } from './translation-memory/translation-memory.module'
// import { CacheModule } from './cache/cache.module'

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    ProjectsModule,
    TranslationsModule,
    NamespacesModule,
    TranslationKeysModule,
    TagsModule,
    CommentsModule,
    HealthModule,
    TranslationMemoryModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
