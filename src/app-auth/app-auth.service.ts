import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AppAuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<ReturnLogin> {
    const user: UserEntity = await this.userService.findUserByEmail(
      loginDto.email,
    );

    const isMatch: boolean = await compare(loginDto.password, user?.password);

    if (!isMatch)
      throw new NotFoundException(UserService.MESSAGE_EMAIL_PASSWORD_INVALID);

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDTO(user),
    };
  }
}
