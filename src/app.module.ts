import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerController } from './interfaces/http/farmer.controller';
import { FarmerService } from './application/services/farmer.service';
import { TypeOrmConfigModule } from './infrastructure/database/typeorm/typeorm.module';
import { FarmerRepositoryImpl } from './infrastructure/database/repositories/farmer.repository.impl';
import { ConfigModule } from '@nestjs/config';
import { FarmerEntity } from './infrastructure/database/entities/farmer.typeorm.entity';
import { InsightController } from './interfaces/http/insights.controller';

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
