import { Test, TestingModule } from '@nestjs/testing';
import { LightingAdController } from './lighting-ad.controller';
import { LightingAdService } from './lighting-ad.service';

describe('LightingAdController', () => {
  let controller: LightingAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightingAdController],
      providers: [LightingAdService],
    }).compile();

    controller = module.get<LightingAdController>(LightingAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
