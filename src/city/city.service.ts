import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CacheService } from '../cache/cache.service';
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
  }

  async findById(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id } });

    return city;
  }

  throwExceptionIfNull(city: CityEntity): void | NotFoundException {
    if (!city) throw new NotFoundException('User not found');
  }
}
