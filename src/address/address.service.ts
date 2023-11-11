import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateAddressDTO from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(
    createAddresDTO: CreateAddressDTO,
    userId: number,
  ): Promise<void> {
    const address = { ...createAddresDTO, userId };
    await this.addressRepository.save(address);
  }
}
