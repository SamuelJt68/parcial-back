import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { Reservation } from './entities/reservation.entity.js';
import { ParkingSport } from '../parking-sports/entities/parking-sport.entity.js';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class ReservationsService {

    private hasRole(user: User, roleName: string): boolean {
    return Boolean(user.roles?.some((r) => r.role_name === roleName));
      }

  constructor(
      @InjectRepository(Reservation)
      private readonly reservationRepository: Repository<Reservation>,
      @InjectRepository(ParkingSport)
      private readonly parkingRepository: Repository<ParkingSport>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,

    ) {}
  create(createReservationDto: CreateReservationDto) {
    const dataReserva = createReservationDto;

    if(!dataReserva.date){
      throw new BadRequestException("La fecha no puede estar vacia")
    }

    if(!dataReserva.vehicle_plate){
      throw new BadRequestException("La placa no puede estar vacia")
    }

  }

  async findAll(user: User) {
      if (this.hasRole(user, 'Conductor')) {

        const ListarReservas = await this.reservationRepository.find({})
        return ListarReservas

      }

      if (this.hasRole(user, 'Supervisor')){

        const ListaReservasSuper = await this.userRepository.findBy({
          
        })
      } 
       
    
  }


  async remove(id: string) {

      const reserva = await this.reservationRepository.findOneBy({id});

    if (!reserva) {
     throw new NotFoundException('Cita no encontrada');
  
    await this.reservationRepository.remove(reserva);
    return { message: 'Cita eliminada con éxito' };
    
  }
}}
