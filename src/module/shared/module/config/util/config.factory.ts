import { ConfigException } from '../exception/config.exception';
import { configSchema } from './config.schema';
import { Config } from './config.type';

export const factory = (): Config => {
  const result = configSchema.safeParse({
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
      database: process.env.POSTGRESQL_DATABASE,
      password: process.env.POSTGRESQL_PASSWORD,
      port: process.env.POSTGRESQL_PORT_NUMBER,
      url: process.env.DATABASE_URL,
      username: process.env.POSTGRESQL_USERNAME,
    },
    movieDb: {
      apiToken: process.env.MOVIEDB_API_TOKEN,
      url: process.env.MOVIEDB_BASE_URL,
    },
  });

  if (result.success) {
    return result.data;
  }

  throw new ConfigException(
    `Invalid application configuration: ${result.error.message}`,
  );
};
