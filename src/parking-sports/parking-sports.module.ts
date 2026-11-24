import { Module } from '@nestjs/common';
import { ParkingSportsService } from './parking-sports.service.js';
import { ParkingSportsController } from './parking-sports.controller.js';

@Module({
  controllers: [ParkingSportsController],
  providers: [ParkingSportsService],
})
export class ParkingSportsModule {}
