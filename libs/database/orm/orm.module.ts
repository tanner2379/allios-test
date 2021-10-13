import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import mikroOrmConfig from './config/mikro-orm.config';
import { ALL_ENTITIES } from './constants/allEntities';

/**
 * The ORM Module connects directly to the database and contains
 * definitions of all entities.
 */
@Module({
  imports: [
    //* Third-Party Modules
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature(ALL_ENTITIES),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
