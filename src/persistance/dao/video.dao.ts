import { Injectable } from '@nestjs/common';
import { CreateContentData } from '@src/core/service/content-management.service';
import { PrismaService } from '@src/persistance/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class VideoDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async create(videoData: CreateContentData) {
    const { title, description, url, thumbnailUrl, sizeInKb } = videoData;
    const createdVideo = await this.prismaService.video.create({
      data: {
        id: randomUUID(),
        title,
        description,
        url,
        thumbnailUrl,
        sizeInKb,
        duration: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return createdVideo;
  }
}
