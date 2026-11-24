import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParkingSportDto } from './dto/create-parking-sport.dto.js';
import { UpdateParkingSportDto } from './dto/update-parking-sport.dto.js';

@Injectable()
export class ParkingSportsService {
  create(createParkingSportDto: CreateParkingSportDto) {
    const dataParking = createParkingSportDto;

    if(!dataParking.charger_type){
      throw new BadRequestException("tipo de cargador necesario")
    }

  }

  findAll() {
    return `This action returns all parkingSports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingSport`;
  }

  update(id: number, updateParkingSportDto: UpdateParkingSportDto) {
    return `This action updates a #${id} parkingSport`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSport`;
  }
}
