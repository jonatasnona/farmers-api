import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { FarmerEntity } from './entities/farmer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASS),
      database: process.env.DATABASE_NAME,
      entities: [FarmerEntity],
      synchronize: true, // Set to false in production
    }),
  ],
})
export class TypeOrmConfigModule {}
