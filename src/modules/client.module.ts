import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GetClientHandler } from './client/application/queries/get-client/get-client.query';

import { CLIENT_REPOSITORY_TOKEN } from './client/domain/ports/tokens';
import { ClientMockRepository } from './client/infrastructure/persistence/client.mock-repository';
import { ClientController } from './client/infrastructure/presentation/client.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ClientController],
  providers: [
    GetClientHandler,
    {
      provide: CLIENT_REPOSITORY_TOKEN,
      useClass: ClientMockRepository,
    },
  ],
})
export class ClientModule {}
