import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import CreateUserDTO from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const salt = 10;
    const passwordHashed = await hash(createUserDTO.password, salt);

    return this.userRepository.save({
      ...createUserDTO,
      password: passwordHashed,
      typeUser: 1,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find();
    return users;
  }
}
