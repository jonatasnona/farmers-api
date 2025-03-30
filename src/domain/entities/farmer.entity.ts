import { CropType } from '../enums/crop-type.enum';

export class Farmer {
  id: string;
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: CropType[];

  constructor(data: Partial<Farmer>) {
    if (data) {
      Object.assign(this, data);

      if (this.arableArea + this.vegetationArea > this.totalArea) {
        throw new Error('Arable and vegetation area cannot exceed total area');
      }
    }
  }
}
