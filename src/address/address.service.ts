import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import CreateAddressDTO from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddresDTO: CreateAddressDTO,
    userId: number,
  ): Promise<void> {
    await this.userService.findEntity(userId);
    await this.cityService.findById(createAddresDTO.cityId);
    await this.addressRepository.save({ ...createAddresDTO, userId });
  }
}
