import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSportsService } from './parking-sports.service.js';
import { CreateParkingSportDto } from './dto/create-parking-sport.dto.js';
import { UpdateParkingSportDto } from './dto/update-parking-sport.dto.js';
import { ReservationsService } from '../reservations/reservations.service.js';

@Controller('parking-sports')
export class ParkingSportsController {
  constructor(private readonly parkingSportsService: ParkingSportsService) {}

  @Post()
  create(@Body() createParkingSportDto: CreateParkingSportDto) {
    const llamar = this.parkingSportsService.create(createParkingSportDto)
  }

  @Get()
  findAll() {
    return this.parkingSportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingSportDto: UpdateParkingSportDto) {
    return this.parkingSportsService.update(+id, updateParkingSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSportsService.remove(+id);
  }
}
