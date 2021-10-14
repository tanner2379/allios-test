import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NamesApiCoreModule } from 'libs/name/api';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), NamesApiCoreModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
