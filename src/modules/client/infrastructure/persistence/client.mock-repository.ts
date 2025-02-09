import { Injectable } from '@nestjs/common';

import { Client } from '../../domain/client.entity';
import { IClientRepository } from '../../domain/ports/repository.interface';

@Injectable()
export class ClientMockRepository implements IClientRepository {
  findById(id: number) {
    if (id > 26) {
      return Promise.reject(new Error(`Client not found with id ${id}`));
    }

    const mockClient = new Client({
      id,
      firstName: 'John',
      lastName: 'Doe',
    });

    console.log('Returning mock Client');
    return Promise.resolve(mockClient);
  }

  update() {
    console.log('Client updated');
    return Promise.resolve();
  }

  create() {
    console.log('Client created');
    return Promise.resolve();
  }
}
