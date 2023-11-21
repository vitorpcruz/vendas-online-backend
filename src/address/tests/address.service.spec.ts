import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/mocks/city.mock';
import { userEntityMock } from '../../user/mocks/user.mock';
import { UserService } from '../../user/user.service';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { createAddressMock } from '../mocks/address.mock';

describe('Address Service', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);

    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('services should be defined', () => {
    expect(service).toBeDefined();

    expect(addressRepository).toBeDefined();
  });

  it('should save address', async () => {
    expect(
      await service.createAddress(createAddressMock, userEntityMock.id),
    ).toBeUndefined();
  });
});
