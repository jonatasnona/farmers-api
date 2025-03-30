import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FarmerRepository } from '../../domain/repositories/farmer.repository';
import { FarmerDto } from '../dto/farmer.dto';
import { Farmer } from '../../domain/entities/farmer.entity';

@Injectable()
export class FarmerService {
  constructor(
    @Inject('FarmerRepository')
    private readonly farmerRepository: FarmerRepository,
  ) {}

  async create(data: FarmerDto): Promise<Farmer> {
    try {
      const farmer = new Farmer(data);
      return await this.farmerRepository.save(farmer);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  async findAll(): Promise<Farmer[]> {
    return await this.farmerRepository.findAll();
  }

  async findById(id: string): Promise<Farmer | null> {
    const farmer = await this.farmerRepository.findById(id);

    if (!farmer) {
      throw new NotFoundException(`Farmer not found`);
    }

    return farmer;
  }

  async update(data: Partial<Farmer>): Promise<Partial<Farmer>> {
    const { id, ...rest } = data;

    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const farmer = await this.farmerRepository.findById(id);

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    return await this.farmerRepository.update({ ...farmer, ...rest });
  }

  async delete(id: string): Promise<void> {
    const farmer = await this.farmerRepository.findById(id);

    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    await this.farmerRepository.delete(id);
  }

  async getInsights(): Promise<any> {
    return await this.farmerRepository.getInsights();
  }
}
