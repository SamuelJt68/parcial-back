import {IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, IsEmail, IsOptional, Length} from "class-validator"
export class CreateUserDto {

        @IsEmail({}, { message: 'Email inválido' })
        @IsNotEmpty()
        email: string;

        @IsString()
        @IsNotEmpty()
        @Length(12-64)
        password: string;

        @IsString()
        @IsNotEmpty()
        name: string;
    
        @IsString()
        @IsOptional()
        phone?: string;
    
}
