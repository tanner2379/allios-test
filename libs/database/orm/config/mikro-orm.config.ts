import * as path from 'path';
import { Options } from '@mikro-orm/core';

import { ALL_ENTITIES } from '../constants/allEntities';

/**
 * Mikro-ORM configuration.
 */
export default {
  type: 'postgresql',
  host: process.env.ORM__DATABASE_HOST,
  port: Number.parseInt(process.env.ORM__DATABASE_PORT, 10),
  dbName: process.env.ORM__DATABASE_NAME,
  user: process.env.ORM__DATABASE_USERNAME,
  password: process.env.ORM__DATABASE_PASSWORD,
  entities: ALL_ENTITIES,
  driverOptions:
    process.env.NODE_ENV !== 'development'
      ? {
          connection: {
            ssl: { rejectUnauthorized: false },
          },
        }
      : undefined,
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    path: path.join(__dirname, '..', '..', 'migrations'),
  },
} as Options;
