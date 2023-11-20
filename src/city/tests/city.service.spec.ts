import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../../cache/cache.service';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { cityMock } from '../mocks/city.mock';

describe('City Service', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
            find: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);

    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    expect(cityRepository).toBeDefined();
  });

  it('should return city by id', async () => {
    const city = await service.findById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return undefined for invalid city id', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    const city: CityEntity = await service.findById(cityMock.id);

    expect(city).toBe(undefined);
  });

  it('should return cities', async function () {
    const cities = await service.getAllCitiesByState(cityMock.id);

    expect(cities).toEqual([cityMock]);
  });
});
