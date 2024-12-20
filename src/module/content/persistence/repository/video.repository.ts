import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DefaultTypeOrmRepository } from '@contentModule/infra/module/typeorm/repository/default-typeorm.repository';
import { Video } from '@contentModule/persistence/entity/video.entity';

@Injectable()
export class VideoRepository extends DefaultTypeOrmRepository<Video> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(Video, dataSource);
  }
}
