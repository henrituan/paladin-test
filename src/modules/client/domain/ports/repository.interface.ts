import { Client } from '../client.entity';

export interface IClientRepository {
  findById(id: number): Promise<Client>;
}
