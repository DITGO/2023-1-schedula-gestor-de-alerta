import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {

  constructor(
    @InjectRepository(Alert)
    private alertRepo: Repository<Alert>,
  ) {}

  async createAlert(dto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepo.create({ ...dto });
    try {
      return await this.alertRepo.save(alert);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAlerts(): Promise<Alert[]> {
    const alerts = await this.alertRepo.find();

    if (alerts.length === 0) {
      throw new NotFoundException('Não existem alertas cadastrados');
    }
    return alerts;
  }

  async findAlertById(idAlert: string) {
    const alert = await this.alertRepo.findOneBy({ id: idAlert });
    if (!alert) {
      throw new NotFoundException('Não foi possível encontrar este alerta');
    }
    return alert;
  }

  async updateAlert(
    idAlert: string,
    dto: UpdateAlertDto,
  ): Promise<Alert> {
    const { status, pendency, read } = dto;
    const alert = await this.alertRepo.findOneBy({ id: idAlert });

    try {
      alert.status = status;
      alert.pendency = pendency;
      alert.read = read;

      await this.alertRepo.save(alert);
      return alert;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteAlert(idAlert: string): Promise<void> {
    const alert = await this.alertRepo.findOneBy({ id: idAlert });
    if (!alert) {
      throw new NotFoundException('Não foi possível encontrar este alerta');
    }
    try {
      await this.alertRepo.delete({ id: idAlert });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}