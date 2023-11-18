import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import CreateAddressDTO from './dtos/createAddress.dto';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddresDTO: CreateAddressDTO,
  ): Promise<void> {
    await this.addressService.createAddress(createAddresDTO, userId);
  }
}
