import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AppAuthService } from './app-auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AppAuthController {
  constructor(private readonly authService: AppAuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO): Promise<ReturnUserDTO> {
    const user: UserEntity = await this.authService.login(loginDto);
    return new ReturnUserDTO(user);
  }
}
