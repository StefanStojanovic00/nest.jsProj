import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { ProfileType } from 'src/enum/profileType.enum';
import { Roles } from 'src/auth/auth/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @Roles(ProfileType.admin)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put()
  @Roles(ProfileType.admin)
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(ProfileType.admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
