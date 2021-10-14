import { Module } from '@nestjs/common';
import { NameModule } from 'libs/database/name';
import { NamesApiCoreController } from './core.controller';
import { NamesApiCoreService } from './core.service';

@Module({
  imports: [NameModule],
  controllers: [NamesApiCoreController],
  providers: [NamesApiCoreService],
  exports: [NamesApiCoreService],
})
export class NamesApiCoreModule {}
