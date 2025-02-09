import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { ClientController } from './client.controller';

describe('ClientController', () => {
  let controller: ClientController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('findOne', () => {
    it('should return an client when a valid ID is provided', async () => {
      const clientId = 12;
      const expectedClient = { id: clientId, name: 'John Doe' };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedClient);

      const result = await controller.findOne(clientId);

      expect(result).toEqual(expectedClient);
    });

    it('should throw an error if ID is not valid', async () => {
      const clientId = 20;
      const errorMessage = 'Client not found with id 20';

      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.findOne(clientId)).rejects.toThrow(errorMessage);
    });
  });
});
