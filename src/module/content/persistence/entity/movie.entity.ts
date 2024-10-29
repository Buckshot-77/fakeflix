import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Content } from '@contentModule/persistence/entity/content.entity';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { DefaultEntity } from '@contentModule/infra/module/typeorm/entity/default.entity';
import { Thumbnail } from '@contentModule/persistence/entity/thumbnail.entity';

@Entity({ name: 'Movie' })
export class Movie extends DefaultEntity<Movie> {
  @OneToOne(() => Video, (video) => video.movie, {
    cascade: true,
  })
  video: Video;

  @OneToOne(() => Content, (content) => content.movie)
  @JoinColumn()
  content: Content;

  @OneToOne(() => Thumbnail, {
    cascade: true,
  })
  @JoinColumn()
  thumbnail: Thumbnail;

  @Column({ type: 'float', nullable: true })
  externalRating: number | null;
}
