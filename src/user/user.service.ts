import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import CreateUserDTO from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  static readonly MESSAGE_USER_NOT_FOUND = 'User not found';
  static readonly MESSAGE_EMAIL_PASSWORD_INVALID = 'Email or password invalid';
  static readonly MESSAGE_EMAIL_IN_USE = 'Email in use.';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    await this.findUserByEmail(createUserDTO.email).then((user) =>
      this.throwNotFoundExceptionByCondition(
        user !== null,
        UserService.MESSAGE_EMAIL_IN_USE,
      ),
    );

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

  async findUserById(userId: number) {
    await this.userRepository
      .findOneBy({ id: userId })
      .then(this.throwExceptionIfNull());
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: { state: true },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .findOneBy({ email })
      .then(this.throwExceptionIfNull(UserService.MESSAGE_USER_NOT_FOUND));
  }

  throwExceptionIfNull(message: string = UserService.MESSAGE_USER_NOT_FOUND) {
    return function (user: UserEntity): UserEntity {
      if (!user) throw new NotFoundException(message);
      return user;
    };
  }

  throwExceptionIfUserExists() {
    return function (user: UserEntity): NotFoundException {
      if (user) throw new NotFoundException(UserService.MESSAGE_EMAIL_IN_USE);
      return;
    };
  }

  throwNotFoundExceptionByCondition(condition: boolean, message: string) {
    if (condition) throw new NotFoundException(message);
  }
}
