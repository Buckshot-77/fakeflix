import { DynamicModule, Module } from '@nestjs/common';
import { Content } from '@src/persistence/entity/content.entity';
import { Episode } from '@src/persistence/entity/episode.entity';
import { Movie } from '@src/persistence/entity/movie.entity';
import { Thumbnail } from '@src/persistence/entity/thumbnail.entity';
import { TvShow } from '@src/persistence/entity/tv-show.entity';
import { Video } from '@src/persistence/entity/video.entity';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { MovieRepository } from '@src/persistence/repository/movie.repository';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { TypeOrmPersistenceModule } from '@src/infra/module/typeorm/typeorm-persistence.module';

@Module({})
export class PersistenceModule {
  static forRoot(opts?: { migrations?: string[] }): DynamicModule {
    const { migrations } = opts || {};
    return {
      module: PersistenceModule,
      imports: [
        TypeOrmPersistenceModule.forRoot({
          migrations,
          entities: [Content, Movie, Thumbnail, Video, TvShow, Episode],
        }),
      ],
      providers: [ContentRepository, MovieRepository, VideoRepository],
      exports: [ContentRepository, MovieRepository, VideoRepository],
    };
  }
}
