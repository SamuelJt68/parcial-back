import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSportsController } from './parking-sports.controller.js';
import { ParkingSportsService } from './parking-sports.service.js';

describe('ParkingSportsController', () => {
  let controller: ParkingSportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSportsController],
      providers: [ParkingSportsService],
    }).compile();

    controller = module.get<ParkingSportsController>(ParkingSportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
