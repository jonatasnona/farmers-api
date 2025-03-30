import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from './farmer.controller';
import { FarmerService } from '../../application/services/farmer.service';
import { FarmerDto } from '../../application/dto/farmer.dto';
import { CropType } from '../../domain/enums/crop-type.enum';

describe('FarmerController', () => {
  let controller: FarmerController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: FarmerService;

  const mockFarmerService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const farmer: FarmerDto = {
    document: '12345678900',
    name: 'John Doe',
    farmName: 'Doe Farm',
    city: 'Springfield',
    state: 'IL',
    totalArea: 100,
    arableArea: 80,
    vegetationArea: 20,
    crops: [CropType.Soybean, CropType.Corn] as CropType[],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        {
          provide: FarmerService,
          useValue: mockFarmerService,
        },
      ],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
    service = module.get<FarmerService>(FarmerService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call FarmerService.create with correct data', async () => {
      mockFarmerService.create.mockResolvedValue(farmer);

      const result = await controller.create(farmer);

      expect(mockFarmerService.create).toHaveBeenCalledWith(farmer);
      expect(result).toEqual(farmer);
    });
  });

  describe('findAll', () => {
    it('should call FarmerService.findAll and return the result', async () => {
      const farmers: FarmerDto[] = [farmer];
      mockFarmerService.findAll.mockResolvedValue(farmers);

      const result = await controller.findAll();

      expect(mockFarmerService.findAll).toHaveBeenCalled();
      expect(result).toEqual(farmers);
    });
  });

  describe('findById', () => {
    it('should call with correct id', async () => {
      mockFarmerService.findById.mockResolvedValue(farmer);

      const result = await controller.findById('1');

      expect(mockFarmerService.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(farmer);
    });

    it('should return null if farmer not found', async () => {
      mockFarmerService.findById.mockResolvedValue(null);

      const result = await controller.findById('non-existent-id');

      expect(mockFarmerService.findById).toHaveBeenCalledWith(
        'non-existent-id',
      );
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should call FarmerService.update with correct data', async () => {
      const updatedFarmer: Partial<FarmerDto> = { ...farmer, name: 'Jane Doe' };
      mockFarmerService.update.mockResolvedValue(updatedFarmer);

      const result = await controller.update('1', updatedFarmer);

      expect(mockFarmerService.update).toHaveBeenCalledWith({
        id: '1',
        ...updatedFarmer,
      });
      expect(result).toEqual(updatedFarmer);
    });
  });

  describe('delete', () => {
    it('should call with correct id', async () => {
      await controller.delete('1');
      expect(mockFarmerService.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if delete fails', async () => {
      mockFarmerService.delete.mockRejectedValue(new Error('Farmer not found'));
      await expect(controller.delete('1')).rejects.toThrow('Farmer not found');
    });
  });
});
