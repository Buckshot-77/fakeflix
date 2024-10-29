import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DefaultEntity } from '@contentModule/infra/module/typeorm/entity/default.entity';
import { TypeOrmMigrationService } from '@contentModule/infra/module/typeorm/service/typeorm-migration.service';
import { ConfigModule } from '@contentModule/infra/module/config/config.module';
import { ConfigService } from '@contentModule/infra/module/config/service/config.service';

@Module({})
export class TypeOrmPersistenceModule {
  static forRoot(options: {
    migrations?: string[];
    entities?: Array<typeof DefaultEntity>;
  }): DynamicModule {
    return {
      module: TypeOrmPersistenceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: async (...args: any[]) => {
            const configService: ConfigService = args.find(
              (arg) => arg instanceof ConfigService,
            ) as ConfigService;

            return {
              type: 'postgres',
              logging: false,
              autoLoadEntities: false,
              synchronize: false,
              migrationsTableName: 'typeorm_migrations',
              //types are infered by the compiler and zod
              ...configService.get('database'),
              ...options,
            };
          },
        }),
      ],
      providers: [TypeOrmMigrationService],
      exports: [TypeOrmMigrationService],
    };
  }
}
