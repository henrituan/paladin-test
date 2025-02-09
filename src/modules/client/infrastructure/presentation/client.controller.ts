import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetClientQuery } from '../../application/queries/get-client/get-client.query';

@Controller('clients')
export class ClientController {
  constructor(private queryBus: QueryBus) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.queryBus.execute(new GetClientQuery(Number(id)));
    } catch {
      throw new HttpException('Client not found', 404);
    }
  }
}
