import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { VideoNotFoundException } from '../exception/video-not-found.exception';

@Injectable()
export class MediaPlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async prepareStreaming(videoId: string) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video)
      throw new VideoNotFoundException(`Video with id ${videoId} not found`);

    return video?.url;
  }
}
