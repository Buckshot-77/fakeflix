import { Module } from '@nestjs/common';

import { ContentController } from '@src/http/rest/controller/content.controller';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { MediaPlayerService } from '@src/core/service/media-player.service';

import { PrismaService } from '@src/prisma.service';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentManagementService, MediaPlayerService, PrismaService],
})
export class AppModule {}
