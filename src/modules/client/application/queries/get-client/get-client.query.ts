import { Inject } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

import { Client } from '../../../domain/client.entity';
import { IClientRepository } from '../../../domain/ports/repository.interface';
import { CLIENT_REPOSITORY_TOKEN } from '../../../domain/ports/tokens';
import { ClientView } from './views/client.view';

export class GetClientQuery extends Query<ClientView> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetClientQuery)
export class GetClientHandler
  implements IQueryHandler<GetClientQuery, ClientView>
{
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private clientRepository: IClientRepository,
  ) {}

  async execute(query: GetClientQuery) {
    const entity = await this.clientRepository.findById(query.id);
    return domainToView(entity);
  }
}

function domainToView(client: Client): ClientView {
  return {
    id: client.getId().toString(),
    firstName: client.getFirstName(),
    lastName: client.getLastName(),
    fullName: `${client.getFirstName()} ${client.getLastName()}`,
  };
}
