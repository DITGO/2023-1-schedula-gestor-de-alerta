import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';

describe('AlertsService', () => {
  let service: AlertsService;
  let alertRepository: Repository<Alert>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockReturnValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
    alertRepository = module.get<Repository<Alert>>(getRepositoryToken(Alert));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
