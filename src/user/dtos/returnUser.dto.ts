import ReturnAddressDTO from 'src/address/dtos/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  adresses?: ReturnAddressDTO[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;

    this.adresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new ReturnAddressDTO(address))
      : undefined;
  }

  static fill(userEntity: UserEntity) {
    return new ReturnUserDTO(userEntity);
  }
}
