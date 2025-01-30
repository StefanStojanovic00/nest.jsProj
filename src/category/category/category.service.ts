import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

  async create(CreateCategoryDto: CreateCategoryDto):Promise<Category>
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

  async update(updateCategoryDto: UpdateCategoryDto) {
    
    const{id,name}=updateCategoryDto;

    const category:Category=await this.categoryRepository.findOne({
      where:{id:id}
    });

    if(!category)  throw new BadRequestException('invalideCategory');

    category.name=name;

    
    return this.categoryRepository.update(id,category);

    
  }
  async delete(id: number) {
    
    const category:Category=await this.categoryRepository.findOne(
      {
        where:{id:id}
      }
    );

    if(!category)  throw new BadRequestException('invalideCategory');

    return this.categoryRepository.delete(category.id);


  }
 
}
