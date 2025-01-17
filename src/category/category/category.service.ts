import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
 
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto)
  {
    if(CreateCategoryDto ===undefined || CreateCategoryDto.name === '' || CreateCategoryDto === null)
      throw new BadRequestException('InvalidCategoryName');
    
    let category=await this.categoryRepository.findOneBy({name:CreateCategoryDto.name});

    if(category) throw new BadRequestException('CategoryAlredyExist');

    category=this.categoryRepository.create(CreateCategoryDto);

    category.LightingAd=[];
    return this.categoryRepository.save(category);
  }

  getAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({id:id});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
