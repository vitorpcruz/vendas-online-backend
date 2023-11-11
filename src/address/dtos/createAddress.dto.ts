import { IsInt, IsOptional, IsString } from 'class-validator';

export default class CreateAddressDTO {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
