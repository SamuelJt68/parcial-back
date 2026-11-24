import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSportsService } from './parking-sports.service.js';

describe('ParkingSportsService', () => {
  let service: ParkingSportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSportsService],
    }).compile();

    service = module.get<ParkingSportsService>(ParkingSportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
