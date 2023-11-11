import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm/repository/Repository';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private cacheService: CacheService,
  ) {}

  async getAllCitiesByState(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      `state_${stateId}`,
      async () =>
        await this.cityRepository.find({
          where: { stateId },
        }),
    );

    // const citiesCache: CityEntity[] = await this.cacheManager.get(
    //   ,
    // );

    // if (citiesCache) return citiesCache;

    // const cities: CityEntity[] = await this.cityRepository.find({
    //   where: { stateId },
    // });

    // await this.cacheManager.set(`state_${stateId}`, cities);

    // return cities;
  }
}
