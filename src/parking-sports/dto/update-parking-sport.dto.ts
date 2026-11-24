import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingSportDto } from './create-parking-sport.dto.js';

export class UpdateParkingSportDto extends PartialType(CreateParkingSportDto) {}
