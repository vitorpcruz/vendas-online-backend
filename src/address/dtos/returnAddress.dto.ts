import { returnCityDTO } from 'src/city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export default class ReturnAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: returnCityDTO;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new returnCityDTO(address.city) : undefined;
  }
}
