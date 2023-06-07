import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { CacheModule } from '@nestjs/common';

describe('AlertsController', () => {
  let alertsController: AlertsController;

  const mockUuid = uuidv4();

  const mockCreateAlertDto: CreateAlertDto = {
    sourceName: 'mock_name',
    sourceEmail: 'mock_email',
    targetName: 'mock_target_name',
    targetEmail: 'mock_target_email',
    message: 'mock_message',
    status: 'mock_status',
    pendency: '',
    read: false,
    createdAt: new Date('2023-06-06'),
  };

  const mockUpdteAlertDto: UpdateAlertDto = {
    status: 'mock_status_pendent',
    read: true,
    pendency: 'mock_pendency',
  };

  const mockAlertsService = {
    createAlert: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findAlertById: jest.fn((id) => {
      return {
        ...mockCreateAlertDto,
        id,
      };
    }),
    updateAlert: jest.fn((id, dto) => {
      return {
        ...mockCreateAlertDto,
        ...dto,
        id,
      };
    }),
    deleteAlert: jest.fn((id) => {
      return id;
    }),
    findAlerts: jest.fn(() => {
      return [{ ...mockCreateAlertDto }];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [AlertsService],
      imports: [CacheModule.register()],
    })
      .overrideProvider(AlertsService)
      .useValue(mockAlertsService)
      .compile();

    alertsController = module.get<AlertsController>(AlertsController);
  });

  it('should be defined', () => {
    expect(alertsController).toBeDefined();
  });

  it('should create a new alert with success', async () => {
    const dto = mockCreateAlertDto;
    const response = await alertsController.create(dto);

    expect(response).toMatchObject({ ...dto });
  });

  it('should return an alert with success', async () => {
    const alertId = mockUuid;
    const response = await alertsController.findOne(alertId);

    expect(response).toMatchObject({ id: alertId });
  });

  it('should return all alerts with success', async () => {
    const response = await alertsController.findAll();

    expect(response.length).toBeGreaterThan(0);
    expect(response).toEqual([{ ...mockCreateAlertDto }]);
  });

  it('should update an alert with success', async () => {
    const alertId = mockUuid;
    const dto = mockUpdteAlertDto;
    const response = await alertsController.update(alertId, dto);
    expect(response).toMatchObject({
      ...mockCreateAlertDto,
      ...dto,
      id: alertId,
    });
  });

  it('should delete an alert with success', async () => {
    const alertId = mockUuid;
    const successMessage = 'Alerta removido com sucesso';
    const response = await alertsController.remove(alertId);

    expect(response).toMatchObject({ message: successMessage });
  });
});
