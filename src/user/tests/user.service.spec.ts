import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { createUserMock, userEntityMock } from '../mocks/user.mock';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail if user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return error in findUserById if user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockRejectedValue(new NotFoundException());

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return error in findUserById (error DB)', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockRejectedValue(new NotFoundException());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return error if user exists during user creating', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return created (http 201) if user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
