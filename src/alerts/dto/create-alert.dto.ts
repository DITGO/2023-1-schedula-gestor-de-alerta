import { IsNotEmpty, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateAlertDto {
    sourceName: string;

    sourceEmail: string;

    targetName: string;

    targetEmail: string;

    @IsNotEmpty({ message: 'Insira uma mensagem' })
    @IsString({ message: 'Insira uma mensagem válida' })
    @MaxLength(500, { message: 'A mensagem deve ter no máximo 500 caracteres' })
    message: string;

    @IsNotEmpty({ message: 'Insira um status' })
    @IsString({ message: 'Insira um status válido' })
    status: string;

    pendency: string;

    @IsBoolean()
    read: boolean;

    createdAt: Date;
}
