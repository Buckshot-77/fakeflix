import { Injectable } from '@nestjs/common';
import { VideoDAO } from '@src/persistance/dao/video.dao';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly videoDAO: VideoDAO) {}

  async createContent(createContentData: CreateContentData) {
    const { title, description, url, thumbnailUrl, sizeInKb } =
      createContentData;
    const createdVideo = await this.videoDAO.create({
      title,
      description,
      url,
      thumbnailUrl,
      sizeInKb,
    });

    return createdVideo;
  }
}
