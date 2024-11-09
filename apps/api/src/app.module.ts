import { Module } from '@nestjs/common';
import { PrismaService } from '@bumblebee/database';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
