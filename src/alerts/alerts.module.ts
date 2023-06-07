import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { Alert } from './entities/alert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
