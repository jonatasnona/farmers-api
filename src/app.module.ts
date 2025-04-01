import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerController } from './interfaces/http/farmer.controller';
import { FarmerService } from './application/services/farmer.service';
import { TypeOrmConfigModule } from './infrastructure/database/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { InsightController } from './interfaces/http/insights.controller';
import { FarmerRepositoryImpl } from './infrastructure/database/typeorm/repositories/farmer.repository.impl';
import { FarmerEntity } from './infrastructure/database/typeorm/entities/farmer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([FarmerEntity]),
    TypeOrmConfigModule,
  ],
  controllers: [FarmerController, InsightController],
  providers: [
    FarmerService,
    {
      provide: 'FarmerRepository',
      useClass: FarmerRepositoryImpl,
    },
  ],
  exports: ['FarmerRepository'],
})
export class AppModule {}
