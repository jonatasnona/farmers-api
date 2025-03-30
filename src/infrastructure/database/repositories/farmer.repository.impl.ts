import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmerRepository } from 'src/domain/repositories/farmer.repository';
import { FarmerEntity } from '../entities/farmer.typeorm.entity';
import { Farmer } from 'src/domain/entities/farmer.entity';

@Injectable()
export class FarmerRepositoryImpl implements FarmerRepository {
  constructor(
    @InjectRepository(FarmerEntity)
    private readonly repository: Repository<FarmerEntity>,
  ) {}

  async save(farmer: Farmer): Promise<Farmer> {
    return this.repository.save(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Farmer | null> {
    const farmer = await this.repository.findOne({ where: { id } });
    return farmer ?? null;
  }

  async update(farmer: Partial<Farmer>): Promise<Partial<Farmer>> {
    return this.repository.save(farmer);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getInsights() {
    const totalFarms = await this.repository.count();

    const totalHectares = await this.repository
      .createQueryBuilder('farmer')
      .select('SUM(farmer.totalArea)', 'sum')
      .getRawOne<{ sum: string | null }>();

    const cropsByState = await this.repository
      .createQueryBuilder('farmer')
      .select([
        'farmer.state',
        "unnest(string_to_array(farmer.crops, ',')) as crop",
        'COUNT(*) as count',
      ])
      .groupBy('farmer.state, crop')
      .getRawMany();

    return {
      totalFarms,
      totalHectares: Number(totalHectares?.sum || 0),
      cropsByState,
    };
  }
}
