import { Module } from '@nestjs/common';
import { OrmModule } from 'libs/database/orm';

import { NameService } from './name.service';

@Module({
  imports: [OrmModule],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
