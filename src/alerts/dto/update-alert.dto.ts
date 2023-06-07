import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateAlertDto {
  @IsNotEmpty({ message: 'Insira um status' })
  @IsString({ message: 'Insira um status válido' })
  status: string;

  pendency: string;

  @IsBoolean()
  read: boolean;
}
