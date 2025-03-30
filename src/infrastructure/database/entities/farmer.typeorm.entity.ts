import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CropType } from 'src/domain/enums/crop-type.enum';

@Entity('farmers')
export class FarmerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  document: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  arableArea: number;

  @Column('decimal')
  vegetationArea: number;

  @Column('simple-array')
  crops: CropType[];
}
