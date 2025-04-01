import { Controller, Get } from '@nestjs/common';
import { FarmerService } from '../../application/services/farmer.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('insights')
export class InsightController {
  constructor(private readonly service: FarmerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get insights',
    description: 'Retrieve insights from the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Insights retrieved successfully',
    schema: {
      example: {
        totalFarms: 4,
        totalHectares: 9500,
        cropsByState: [
          {
            farmer_state: 'GO',
            crop: 'Café',
            count: '1',
          },
          {
            farmer_state: 'AC',
            crop: 'Cana de açucar',
            count: '2',
          },
          {
            farmer_state: 'AC',
            crop: 'Café',
            count: '1',
          },
          {
            farmer_state: 'GO',
            crop: 'Algodão',
            count: '1',
          },
          {
            farmer_state: 'GO',
            crop: 'Milho',
            count: '1',
          },
          {
            farmer_state: 'GO',
            crop: 'Soja',
            count: '1',
          },
        ],
      },
    },
  })
  async getInsights(): Promise<any> {
    return await this.service.getInsights();
  }
}
