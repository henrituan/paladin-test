import { ClientMockRepository } from '../../../infrastructure/persistence/client.mock-repository';

import { GetClientHandler, GetClientQuery } from './get-client.query';
import { ClientView } from './views/client.view';

describe('GetClientHandler', () => {
  const handler = new GetClientHandler(new ClientMockRepository());

  const expectedView: ClientView = {
    id: '7',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
  };

  describe('execute', () => {
    it('should get client by id and transform to view', async () => {
      const query = new GetClientQuery(7);

      const result = await handler.execute(query);

      expect(result).toEqual(expectedView);
    });

    it('should throw error with wrong id', async () => {
      const query = new GetClientQuery(30);
      const error = new Error('Client not found with id 30');

      await expect(handler.execute(query)).rejects.toThrow(error);
    });
  });
});
