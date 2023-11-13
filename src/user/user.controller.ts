import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateUserDTO from './dtos/createUser.dto';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ReturnUserDTO[]> {
    const users: UserEntity[] = await this.userService.getAllUsers();
    const returnUsersDTO: ReturnUserDTO[] = users.map(ReturnUserDTO.fill);
    return returnUsersDTO;
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDTO);
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
    const user: UserEntity =
      await this.userService.getUserByIdUsingRelations(userId);
    return new ReturnUserDTO(user);
  }
}
