import { IPerson } from '../interfaces';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePersonDto implements IPerson {
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-z ]+$/i, { message: 'fullName must be a string of letters' })
  fullName: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(10)
  dni: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  phoneNumber: string;
}
