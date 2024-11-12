import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { ContentModule } from '@contentModule/content.module';
import { IdentityModule } from '@identityModule/identity.module';

@Module({
  imports: [
    ContentModule,
    IdentityModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
