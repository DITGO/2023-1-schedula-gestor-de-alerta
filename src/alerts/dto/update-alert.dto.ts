import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';

import { IsNotEmpty, IsString, MaxLength, IsEmail, IsBoolean } from 'class-validator';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  id: string;

  @IsNotEmpty({ message: 'Insira um status' })
  @IsString({ message: 'Insira um status válido' })
  status: string;

  pendency: string;

  @IsBoolean()
  read: boolean;
}
