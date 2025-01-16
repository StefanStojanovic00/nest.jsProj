import { Injectable } from '@nestjs/common';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';

@Injectable()
export class LightingAdService {
  create(createLightingAdDto: CreateLightingAdDto) {
    return 'This action adds a new lightingAd';
  }

  findAll() {
    return `This action returns all lightingAd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lightingAd`;
  }

  update(id: number, updateLightingAdDto: UpdateLightingAdDto) {
    return `This action updates a #${id} lightingAd`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingAd`;
  }
}
