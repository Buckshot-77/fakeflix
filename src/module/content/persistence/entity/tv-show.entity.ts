import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Content } from '@contentModule/persistence/entity/content.entity';
import { Episode } from '@contentModule/persistence/entity/episode.entity';
import { Thumbnail } from '@contentModule/persistence/entity/thumbnail.entity';
import { DefaultEntity } from '@contentModule/infra/module/typeorm/entity/default.entity';

@Entity({ name: 'TvShow' })
export class TvShow extends DefaultEntity<TvShow> {
  @OneToMany(() => Episode, (episode) => episode.tvShow)
  episodes: Episode[];

  @OneToOne(() => Content)
  @JoinColumn()
  content: Content;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;
}
