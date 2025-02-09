import { Client } from '../client.entity';

export interface IClientRepository {
  findById(id: number): Promise<Client>;
  create(client: Client): Promise<void>;
  update(client: Client): Promise<void>;
}
