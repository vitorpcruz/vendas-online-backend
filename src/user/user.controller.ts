import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateUserDTO from './dtos/CreateUserDTO';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return JSON.stringify({ test: 'abc' });
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return {
      ...createUserDTO,
      password: undefined,
    };
  }
}
