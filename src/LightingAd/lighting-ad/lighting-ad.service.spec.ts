import { Test, TestingModule } from '@nestjs/testing';
import { LightingAdService } from './lighting-ad.service';

describe('LightingAdService', () => {
  let service: LightingAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightingAdService],
    }).compile();

    service = module.get<LightingAdService>(LightingAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
