import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorators';
import { UserId } from '../decorators/user-id.decorators';
import { UserType } from '../user/enum/user-type.enum';
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
