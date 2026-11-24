import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @IsString({ message: 'refreshToken es requerido' })
  @IsNotEmpty({ message: 'refreshToken es requerido' })
  refreshToken: string;
}