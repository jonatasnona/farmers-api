import { Test, TestingModule } from '@nestjs/testing';
import { FarmerService } from './farmer.service';
import { FarmerRepository } from '../../domain/repositories/farmer.repository';
import { FarmerDto } from '../dto/farmer.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CropType } from '../../domain/enums/crop-type.enum';
import { Farmer } from '../../domain/entities/farmer.entity';

describe(FarmerService.name, () => {
  let service: FarmerService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: FarmerRepository;

  const mockFarmerRepository = {
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const farmerDto: FarmerDto = {
    document: '12345678900',
    name: 'John Doe',
    farmName: 'Doe Farm',
    city: 'Springfield',
    state: 'IL',
    totalArea: 100,
    arableArea: 80,
    vegetationArea: 20,
    crops: [CropType.Soybean, CropType.Corn],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: 'FarmerRepository',
          useValue: mockFarmerRepository,
        },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
    repository = module.get<FarmerRepository>('FarmerRepository');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a farmer successfully', async () => {
      const farmer = new Farmer(farmerDto);

      mockFarmerRepository.save.mockResolvedValue(farmer);

      const result = await service.create(farmer);

      expect(result).toEqual(farmer);
      expect(mockFarmerRepository.save).toHaveBeenCalledWith(farmer);
    });

    it('should throw BadRequestException on save error', async () => {
      mockFarmerRepository.save.mockRejectedValue(new Error('Save error'));

      await expect(service.create(farmerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all farmers', async () => {
      const farmers: Farmer[] = [new Farmer(farmerDto)];

      mockFarmerRepository.findAll.mockResolvedValue(farmers);

      const result = await service.findAll();

      expect(result).toEqual(farmers);
      expect(mockFarmerRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a farmer by ID', async () => {
      const farmer = new Farmer(farmerDto);
      mockFarmerRepository.findById = jest.fn().mockResolvedValue(farmer);

      const result = await service.findById('123');

      expect(result).toEqual(farmer);
      expect(mockFarmerRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if farmer not found', async () => {
      mockFarmerRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(service.findById('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a farmer successfully', async () => {
      const farmer = new Farmer(farmerDto);
      const updatedFarmer = { ...farmer, name: 'Jane Doe' };

      mockFarmerRepository.findById = jest.fn().mockResolvedValue(farmer);
      mockFarmerRepository.update = jest.fn().mockResolvedValue(updatedFarmer);

      const result = await service.update({ id: '123', name: 'Jane Doe' });

      expect(result).toEqual(updatedFarmer);
      expect(mockFarmerRepository.findById).toHaveBeenCalledWith('123');
      expect(mockFarmerRepository.update).toHaveBeenCalledWith(updatedFarmer);
    });

    it('should throw NotFoundException if farmer not found', async () => {
      mockFarmerRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(
        service.update({ id: '123', name: 'Jane Doe' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a farmer successfully', async () => {
      const farmer = new Farmer(farmerDto);

      mockFarmerRepository.findById = jest.fn().mockResolvedValue(farmer);
      mockFarmerRepository.delete = jest.fn().mockResolvedValue(undefined);

      await service.delete('123');

      expect(mockFarmerRepository.findById).toHaveBeenCalledWith('123');
      expect(mockFarmerRepository.delete).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if farmer not found', async () => {
      mockFarmerRepository.findById = jest.fn().mockResolvedValue(undefined);

      await expect(service.delete('123')).rejects.toThrow(NotFoundException);
      expect(mockFarmerRepository.findById).toHaveBeenCalledWith('123');
      expect(mockFarmerRepository.delete).not.toHaveBeenCalled();
    });
  });
});
