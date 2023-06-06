import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) { }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.createAlert(createAlertDto);
  }

  @Get()
  findAll() {
    return this.alertsService.findAlerts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findAlertById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.updateAlert(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.deleteAlert(id);
  }
}