import { cityMock } from '../../city/mocks/city.mock';
import { userEntityMock } from '../../user/mocks/user.mock';
import CreateAddressDTO from '../dtos/createAddress.dto';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  cep: '123',
  cityId: cityMock.id,
  complement: 'ABC',
  id: 123,
  numberAddress: 123,
  updatedAt: new Date(),
  createdAt: new Date(),
  userId: userEntityMock.id,
};

export const createAddressMock: CreateAddressDTO = {
  cityId: cityMock.id,
  complement: addressMock.complement,
  cep: addressMock.cep,
  numberAddress: addressMock.numberAddress,
};
