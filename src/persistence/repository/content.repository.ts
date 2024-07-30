import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContentEntity } from '@src/core/entity/content.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContentRepository {
  private readonly model: PrismaService['content'];

  constructor(prismaService: PrismaService) {
    this.model = prismaService.content;
  }

  async create(content: ContentEntity): Promise<ContentEntity> {
    try {
      const movie = content.getMedia();
      if (!movie) {
        throw new Error('Movie must be present');
      }
      const video = movie.getVideo();
      const thumbnail = movie.getThumbnail();

      await this.model.create({
        data: {
          id: content.getId(),
          title: content.getTitle(),
          description: content.getDescription(),
          type: content.getType(),
          createdAt: content.getCreatedAt(),
          updatedAt: content.getUpdatedAt(),
          Movie: {
            create: {
              id: movie.getId(),
              Video: {
                create: video.serialize(),
              },
              Thumbnail: {
                create: thumbnail?.serialize(),
              },
            },
          },
        },
      });

      return content;
    } catch (error) {
      throw new Error(`Error while saving content: ${error}`);
    }
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return 'An error occurred while saving content';
  }

  protected handleAndThrowError(error: unknown): void {
    const errorMessage = this.extractErrorMessage(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(errorMessage);
  }
}
