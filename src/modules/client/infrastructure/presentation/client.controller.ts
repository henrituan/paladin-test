import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetClientQuery } from '../../application/queries/get-client/get-client.query';

@Controller('clients')
export class ClientController {
  constructor(private queryBus: QueryBus) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetClientQuery(id));
  }
}
