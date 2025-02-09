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
      const expectedClient = { id: '12', name: 'John Doe' };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedClient);

      const result = await controller.findOne('12');

      expect(result).toEqual(expectedClient);
    });

    it('should throw an error if ID is not valid', async () => {
      const errorMessage = 'Client not found';

      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.findOne('30')).rejects.toThrow(errorMessage);
    });
  });
});
