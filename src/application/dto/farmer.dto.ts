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
import { ApiProperty } from '@nestjs/swagger';

export class FarmerDto {
  @ApiProperty({
    description: 'Document of the farmer',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => OnlyNumbers.apply(value as string))
  @Validate(DocumentValidator)
  document: string;

  @ApiProperty({
    description: 'Name of the farmer',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Name of the farm',
    example: 'Fazenda Boa Esperança',
  })
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @ApiProperty({
    description: 'City where the farm is located',
    example: 'Goiânia',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'State where the farm is located',
    example: 'GO',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'Total area of the farm in hectares',
    example: 1000,
  })
  @IsNumber()
  totalArea: number;

  @ApiProperty({
    description: 'Arable area of the farm in hectares',
    example: 600,
  })
  @IsNumber()
  arableArea: number;

  @ApiProperty({
    description: 'Vegetation area of the farm in hectares',
    example: 400,
  })
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({
    description: 'Crops planted in the farm',
    example: ['Soja', 'Milho'],
    enum: CropType,
    isArray: true,
  })
  @IsArray()
  crops: CropType[];
}
