import {IsDate, IsEnum, IsInt, IsNotEmpty, IsString} from "class-validator"
import { status, vehicle_max_charge } from "../entities/reservation.entity.js";

export class CreateReservationDto {

    @IsDate()
    date: Date;

    @IsString()
    @IsNotEmpty()
    vehicle_plate: string;

    @IsEnum(vehicle_max_charge)
    vehicle_max_charge: string;

}
