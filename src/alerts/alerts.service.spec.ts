import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateAlertDto } from './dto/update-alert.dto';

describe('AlertsService', () => {
  let service: AlertsService;
  let alertRepo: Repository<Alert>;

  const mockUuid = uuid();

  const mockCreateAlertDto: CreateAlertDto = {
    sourceName: 'mockSourceName',
    sourceEmail: 'mockSourceEmail',
    targetName: 'mockTargetName',
    targetEmail: 'mockTargetEmail',
    message: 'mockMessage',
    status: 'mockStatus',
    pendency: 'mockPendency',
    read: false,
    createdAt: new Date(),
  }

  const mockUpdateAlertDto: UpdateAlertDto = {
    status: 'mockStatus',
    pendency: 'mockPendency',
    read: true,
  }

  const mockCreateAlertEntity = {
    id: mockUuid,
    ...mockCreateAlertDto,
  };

  const mockUpdateAlertEntity = {
    id: mockUuid,
    ...mockCreateAlertDto,
    read: true,
  };

  const mockAlertEntityList = [{ ...mockCreateAlertEntity }];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateAlertEntity),
            find: jest.fn().mockReturnValue(mockAlertEntityList),
            findOne: jest.fn().mockReturnValue(mockAlertEntityList[0]),
            findOneBy: jest.fn().mockReturnValue(mockAlertEntityList[0]),
            save: jest.fn().mockReturnValue(mockCreateAlertEntity),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
  
    service = moduleRef.get<AlertsService>(AlertsService);
    alertRepo = moduleRef.get<Repository<Alert>>(getRepositoryToken(Alert));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(alertRepo).toBeDefined();
  });

  describe('createAlert', () => {
    it('should create a alert entity successfully', async () => {
        const result = await service.createAlert(mockCreateAlertDto);
  
        expect(result).toEqual(mockCreateAlertEntity);

        expect(alertRepo.create).toHaveBeenCalledTimes(1);
    });

    it('should throw a internal server error', async () => {
      jest.spyOn(alertRepo, 'save').mockRejectedValueOnce(new Error());

      expect(service.createAlert(mockCreateAlertDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a alert entity list successfully', async () => {
      const result = await service.findAlerts();

      expect(result).toEqual(mockAlertEntityList);

      expect(alertRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest.spyOn(alertRepo, 'find').mockResolvedValueOnce([]);

      expect(service.findAlerts()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOneBy', () => {
    it('should return a alert entity successfully', async () => {
      const result = await service.findAlertById(mockUuid);

      expect(result).toEqual(mockAlertEntityList[0]);

      expect(alertRepo.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest.spyOn(alertRepo, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.findAlertById(mockUuid)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateAlert', () => {
    it('should update a alert entity successfully', async () => {
      const result = await service.updateAlert(mockUuid, mockUpdateAlertDto);

      expect(result).toEqual(mockUpdateAlertEntity);

      expect(alertRepo.findOneBy).toHaveBeenCalledTimes(1);
      expect(alertRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a internal server error', async () => {
      jest.spyOn(alertRepo, 'save').mockRejectedValueOnce(new Error());

      expect(service.updateAlert(mockUuid, mockUpdateAlertDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteAlert', () => {
    it('should remove a alert entity successfully', async () => {
      const result = await service.deleteAlert(mockUuid);

      expect(result).toEqual(undefined);
    });

    it('should throw a not found exception', async () => {
      jest.spyOn(alertRepo, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.deleteAlert(mockUuid)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw a internal server error', async () => {
      jest.spyOn(alertRepo, 'delete').mockRejectedValueOnce(new Error());

      expect(service.deleteAlert(mockUuid)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

});
