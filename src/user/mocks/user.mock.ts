import CreateUserDTO from '../dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678910',
  createdAt: new Date(),
  email: 'emailmock@email.com',
  id: 123,
  name: 'nameMock',
  password: 'largePassword',
  phone: '123456',
  typeUser: UserType.User,
  updatedAt: new Date(),
};

export const createUserMock: CreateUserDTO = {
  cpf: '123456789101',
  email: 'newmock@email.com',
  name: 'nameMock1',
  password: 'largePassword1',
  phone: '1234561',
};
