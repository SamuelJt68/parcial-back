import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    const llamar = this.reservationsService.create(createReservationDto)
  }

  @Get()
  findAll() {
    const llamar = this.reservationsService.findAll
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    const llamar = this.reservationsService.remove(id)
    return llamar
  }
}
  



