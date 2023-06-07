import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  async create(@Body() createAlertDto: CreateAlertDto) {
    return await this.alertsService.createAlert(createAlertDto);
  }

  @Get()
  async findAll() {
    return await this.alertsService.findAlerts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.alertsService.findAlertById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ) {
    return await this.alertsService.updateAlert(id, updateAlertDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.alertsService.deleteAlert(id);
    return {
      message: 'Alerta removido com sucesso',
    };
  }
}
