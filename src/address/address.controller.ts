import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { UserId } from 'src/decorators/user-id.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import CreateAddressDTO from './dtos/createAddress.dto';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @UserId() userId: number,
    @Body() createAddresDTO: CreateAddressDTO,
  ): Promise<void> {
    console.log(userId);
    await this.addressService.createAddress(createAddresDTO, userId);
  }
}
