import { Injectable } from '@nestjs/common';
import { ContentEntity, ContentType } from '@src/core/entity/content.entity';
import { MovieEntity } from '@src/core/entity/movie.entity';
import { VideoEntity } from '@src/core/entity/video.entity';
import { ThumbnailEntity } from '@src/core/entity/thumbnail.entity';
import { ContentRepository } from '@src/persistence/repository/content.repository';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async createContent(createContentData: CreateContentData) {
    const { title, description, url, thumbnailUrl, sizeInKb } =
      createContentData;

    const content = ContentEntity.createNew({
      title,
      description,
      type: ContentType.MOVIE,
      media: MovieEntity.createNew({
        video: VideoEntity.createNew({
          sizeInKb: sizeInKb,
          duration: 100,
          url,
        }),
        thumbnail: ThumbnailEntity.createNew({
          url: thumbnailUrl,
        }),
      }),
    });

    const createdVideo = await this.contentRepository.create(content);

    return createdVideo;
  }
}
