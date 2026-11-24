import {IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsString} from "class-validator"
import { Charger_type } from "../entities/parking-sport.entity.js";

export class CreateParkingSportDto {

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsEnum(Charger_type)
    charger_type: string;

}
