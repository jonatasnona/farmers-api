import { Controller, Get } from '@nestjs/common';
import { FarmerService } from '../../application/services/farmer.service';

@Controller('insights')
export class InsightController {
  constructor(private readonly service: FarmerService) {}

  @Get()
  async getInsights(): Promise<any> {
    return await this.service.getInsights();
  }
}
