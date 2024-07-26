import { Module } from '@nestjs/common';

import { ContentController } from '@src/http/controller/content.controller';
import { ContentManagementService } from '@src/core/service/content-management.service';

import { PrismaService } from '@src/prisma.service';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentManagementService, PrismaService],
})
export class AppModule {}
