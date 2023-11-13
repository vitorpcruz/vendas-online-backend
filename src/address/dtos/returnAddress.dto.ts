import { AddressEntity } from '../entities/address.entity';

export default class ReturnAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}
