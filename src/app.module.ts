import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientModule } from './modules/client.module';

@Module({
  imports: [CqrsModule.forRoot(), ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
