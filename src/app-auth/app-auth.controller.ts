import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppAuthService } from './app-auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AppAuthController {
  constructor(private readonly authService: AppAuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO): Promise<ReturnLogin> {
    const user: ReturnLogin = await this.authService.login(loginDto);
    return user;
  }
}
