import { Farmer } from '../entities/farmer.entity';

export interface FarmerRepository {
  save(farmer: Farmer): Promise<Farmer>;
  findAll(): Promise<Farmer[]>;
  findById(id: string): Promise<Farmer | null>;
  update(farmer: Partial<Farmer>): Promise<Partial<Farmer>>;
  delete(id: string): Promise<void>;
  getInsights(): Promise<any>;
}
