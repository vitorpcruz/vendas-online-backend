import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import CreateUserDTO from './dtos/createUser.dto';
import User from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const salt = 10;
    const passwordHashed = await hash(createUserDTO.password, salt);
    const user: User = {
      ...createUserDTO,
      password: passwordHashed,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
