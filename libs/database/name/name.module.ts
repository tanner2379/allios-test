import { Module } from '@nestjs/common';
import { OrmModule } from 'libs/database/orm';

import { NameService } from './name.service';

//Module for all name entity related services
@Module({
  imports: [OrmModule],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
