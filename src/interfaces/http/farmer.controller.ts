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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('farmers')
export class FarmerController {
  constructor(private readonly service: FarmerService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new farmer',
    description: 'Create a new farmer with the provided data',
  })
  @ApiResponse({
    status: 201,
    description: 'The farmer has been successfully created.',
    type: FarmerDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid document format or other validation errors',
  })
  async create(@Body() data: FarmerDto): Promise<FarmerDto> {
    return await this.service.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all farmers',
    description: 'Retrieve a list of all farmers',
  })
  @ApiResponse({
    status: 200,
    description: 'List of farmers retrieved successfully',
    type: [FarmerDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a farmer by ID',
    description: 'Retrieve a farmer by their unique ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Farmer retrieved successfully',
    type: FarmerDto,
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  async findById(@Param('id') id: string): Promise<FarmerDto | null> {
    return await this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a farmer',
    description: 'Update the details of an existing farmer',
  })
  @ApiResponse({
    status: 200,
    description: 'Farmer updated successfully',
    type: FarmerDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid document format or other validation errors',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<FarmerDto>,
  ): Promise<Partial<FarmerDto>> {
    return await this.service.update({ id, ...data });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a farmer',
    description: 'Delete a farmer by their unique ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Farmer deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
