import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LightingAdService } from './lighting-ad.service';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';


@Controller('lighting-ad')
export class LightingAdController {
  constructor(private readonly lightingAdService: LightingAdService) {}

  @Post()
  create(@Body() createLightingAdDto: CreateLightingAdDto) {
    return this.lightingAdService.create(createLightingAdDto);
  }

  @Get()
  findAll() {
    return this.lightingAdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightingAdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLightingAdDto: UpdateLightingAdDto) {
    return this.lightingAdService.update(+id, updateLightingAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightingAdService.remove(+id);
  }

}
