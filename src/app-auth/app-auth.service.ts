import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AppAuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDTO): Promise<UserEntity> {
    const user: UserEntity = await this.userService.findUserByEmail(
      loginDto.email,
    );

    const isMatch: boolean = await compare(loginDto.password, user?.password);

    if (!isMatch)
      throw new NotFoundException(UserService.MESSAGE_EMAIL_PASSWORD_INVALID);

    return user;
  }
}
