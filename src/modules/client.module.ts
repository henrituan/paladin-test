import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GetClientHandler } from './client/application/queries/get-client/get-client.query';

import { CLIENT_REPOSITORY_TOKEN } from './client/domain/ports/tokens';
import { ClientRepository } from './client/infrastructure/persistence/client.repository';

import { PrismaService } from '../databases/prisma.service';
import { ClientController } from './client/infrastructure/presentation/client.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ClientController],
  providers: [
    GetClientHandler,
    {
      provide: CLIENT_REPOSITORY_TOKEN,
      useClass: ClientRepository,
    },
    PrismaService,
  ],
})
export class ClientModule {}
