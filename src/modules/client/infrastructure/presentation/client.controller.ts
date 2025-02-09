import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateClientCommand } from '../../application/commands/create-client/create-client.command';
import { GetClientQuery } from '../../application/queries/get-client/get-client.query';

interface CreateClientDto {
  firstName: string;
  lastName: string;
}

@Controller('clients')
export class ClientController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.queryBus.execute(new GetClientQuery(Number(id)));
    } catch {
      throw new HttpException('Client not found', 404);
    }
  }

  @Post()
  async createClient(@Body() bookApointmentDto: CreateClientDto) {
    try {
      await this.commandBus.execute(
        new CreateClientCommand(
          bookApointmentDto.firstName,
          bookApointmentDto.lastName,
        ),
      );
    } catch (e) {
      console.log(e);
      throw new HttpException('Client not created', 400);
    }
  }
}
