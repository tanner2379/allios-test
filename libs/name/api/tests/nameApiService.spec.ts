import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';

import { Name } from 'libs/database/entities';
import { NameService, UpdateNameInput } from 'libs/database/name';

import { mockName1 } from './mocks';

//If a test database were set up, this test set could
//be modified to use it, but as is, all DB interactions are mocked.
//For the purpose of this test, I have left out methods that are handled by
//mikro-orm directly, and focused on the ones created in the name services,
//namely create and update.
describe('NameService', () => {
  let nameService: NameService;

  beforeEach(async () => {
    const moduleReference = await Test.createTestingModule({
      providers: [
        NameService,
        {
          provide: getRepositoryToken(Name),
          useValue: {
            //mocks mikro-orm database persist and flush
            persistAndFlush: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(mockName1)),

            //mocks mikro-orm findByIdOrFail function
            findByIdOrFail: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(mockName1)),

            //mocks mikro-orm create function
            create: jest.fn().mockImplementation(() => mockName1),
          },
        },
      ],
    }).compile();

    nameService = moduleReference.get<NameService>(NameService);
  });

  //tests if a name can be created
  describe('create name', () => {
    it('will return a name', async () => {
      const result = await nameService.createName(mockName1);

      //* Assert
      expect(result).toBeDefined();
      expect(result).toEqual(mockName1);
    });
  });

  //tests if a name can be updated
  describe('update name', () => {
    it('will return an updated name', async () => {
      //* Arrange
      const { id } = mockName1;

      const data: UpdateNameInput = {
        nameId: id,
        name: 'editTest',
      };
      jest
        .spyOn(nameService, 'findByIdOrFail')
        .mockImplementation(() => Promise.resolve(mockName1));

      //* Act
      const result = await nameService.updateName(data);

      //* Assert
      expect(result).toBeDefined();
      expect(result.name).toBe(data.name);
    });
  });
});
