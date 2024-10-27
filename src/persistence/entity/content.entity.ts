import { Column, Entity, OneToOne } from 'typeorm';
import { Movie } from '@src/persistence/entity/movie.entity';
import { TvShow } from '@src/persistence/entity/tv-show.entity';
import { DefaultEntity } from '@src/infra/module/typeorm/entity/default.entity';
import { ContentType } from '@src/core/enum/content-type.enum';

@Entity({ name: 'Content' })
export class Content extends DefaultEntity<Content> {
  @Column({ nullable: false, type: 'enum', enum: ContentType })
  type: ContentType;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToOne(() => Movie, (movie) => movie.content, {
    cascade: true,
  })
  movie: Movie;

  @OneToOne(() => TvShow, (tvShow) => tvShow.content, {
    cascade: true,
  })
  tvShow?: TvShow;
}
