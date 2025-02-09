import { Injectable } from '@nestjs/common';
import { Clients as ClientsPrisma } from '@prisma/client';

import { PrismaService } from '../../../../databases/prisma.service';

import { Client } from '../../domain/client.entity';
import { IClientRepository } from '../../domain/ports/repository.interface';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: number) {
    const clientsPrisma = await this.prismaService.clients.findUnique({
      where: {
        id,
      },
    });

    if (!clientsPrisma) {
      throw new Error(`Client not found with id ${id}`);
    }

    return toDomain(clientsPrisma);
  }
}

function toDomain(clientsPrisma: ClientsPrisma) {
  return new Client({
    id: clientsPrisma.id,
    firstName: clientsPrisma.firstName,
    lastName: clientsPrisma.lastName,
  });
}
