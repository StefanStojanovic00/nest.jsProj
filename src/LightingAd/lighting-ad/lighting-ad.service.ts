import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';
import { User } from 'src/User/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightingAd } from './entities/lighting-ad.entity';
import { Category } from 'src/category/category/entities/category.entity';
import path from 'path';

@Injectable()
export class LightingAdService {

  constructor(@InjectRepository(LightingAd) private lightAdRepository:Repository<LightingAd>,
@InjectRepository(Category) private categoryRepository:Repository<Category>)
{

}
  
  public async create(
    createLightingAdDto: CreateLightingAdDto,
     images: Array<Express.Multer.File>, 
     user: User) 
 {
  if(!user)
    throw new BadRequestException('InvalidUser');

    const lad=this.lightAdRepository.create(createLightingAdDto);

    let paths: string[] =[];
    images.forEach((img)=>paths.push(img.filename));

    const category: Category |  null = await this.categoryRepository.findOneBy({
      id: createLightingAdDto.categoryID,
    });

    if(!category) throw new BadRequestException('InvalideCategory');

    lad.gallery=paths;
    lad.createdBy=user;
    lad.category=category;

    return this.lightAdRepository.save(lad);
    
  }

  public async getAll() {
      const lad: LightingAd[] = await this.lightAdRepository.find();

      lad.map((el)=>{
        let a:  string = <string> (<unknown>el.gallery);
        a=a.slice(2);
        a=a.slice(0,-2);
        const lad=a.split('","');

        el.gallery=lad;
        return el;

  });
  return lad;
  }

   remove(id: number) {
    return this.lightAdRepository.delete(id);
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

 
}
