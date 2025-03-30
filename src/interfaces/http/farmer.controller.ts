import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmerDto } from '../../application/dto/farmer.dto';
import { FarmerService } from '../../application/services/farmer.service';

@Controller('farmers')
export class FarmerController {
  constructor(private readonly service: FarmerService) {}

  @Post()
  async create(@Body() data: FarmerDto): Promise<FarmerDto> {
    return await this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FarmerDto | null> {
    return await this.service.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<FarmerDto>,
  ): Promise<Partial<FarmerDto>> {
    return await this.service.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
