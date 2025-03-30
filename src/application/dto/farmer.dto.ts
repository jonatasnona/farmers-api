import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CropType } from '../../domain/enums/crop-type.enum';
import { OnlyNumbers } from '../../domain/helpers/only-numbers.helper';
import { DocumentValidator } from '../../domain/validators/document.validator';

export class FarmerDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => OnlyNumbers.apply(value as string))
  @Validate(DocumentValidator)
  document: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  arableArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsArray()
  crops: CropType[];
}
