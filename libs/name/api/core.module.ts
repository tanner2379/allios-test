import { Module } from '@nestjs/common';
import { NameModule } from 'libs/database/name';
import { NamesApiCoreController } from './core.controller';
import { NamesApiCoreService } from './core.service';

//For ease of use, I opted to use a controller rather
//than setting up a graphql resolver. This allows simple testing
//through the curl utility rather than having to set up postman or
//write a front end. It is a test, not a production app.
@Module({
  imports: [NameModule],
  controllers: [NamesApiCoreController],
  providers: [NamesApiCoreService],
  exports: [NamesApiCoreService],
})
export class NamesApiCoreModule {}
