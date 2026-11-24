import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator"
export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    role_name: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsArray()
    @IsInt({each:true})
    users: number[]
}
