import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';
import { User } from 'src/User/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightingAd } from './entities/lighting-ad.entity';
import { Category } from 'src/category/category/entities/category.entity';
import path from 'path';
import { request } from 'http';

@Injectable()
export class LightingAdService {
 

  constructor(@InjectRepository(LightingAd) private lightAdRepository:Repository<LightingAd>,
@InjectRepository(Category) private categoryRepository:Repository<Category>,
@InjectRepository(User) private userRepository: Repository<User>)
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
    if(images){
    images.forEach((img)=>paths.push(img.filename));
    }
    else{
      paths=null
    }

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
      const lad: LightingAd[] = await this.lightAdRepository.find({relations: { createdBy: true, category: true }});

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

  async remove(id: number,userId:number) {
    
    const ad:LightingAd=await this.lightAdRepository.findOne(
      {
        where:{id:id},
        relations:{createdBy:true},
      }
    );

    if(ad.createdBy.id!==userId)
    {
      throw new BadRequestException('invalideUser');

    }

    if(!(await this.lightAdRepository.delete(id)))
      return{ success:false};

    return{success:true};

  }


  public async getByUser(id:number) {
    const user:User | null = await this.userRepository.findOne({
      where:{id:id},
      relations:{myAds:true}
    });

    if(!user) throw new BadRequestException('invalideUser');
    

    user.myAds.map((el)=>
    {
      let a: string=<string>(<unknown>el.gallery);
      a=a.slice(2);
      a=a.slice(0,-2);
      const arr=a.split('","');
      
      el.gallery=arr;
      return el;
    });

    const data =user.myAds.map((ad:LightingAd)=>
    {
      return {
        ...ad,createdBy:{
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          type: user.type,
          imagePath: user.imagePath,
        },
      };
    });

    return data;
  }

  findOne(id: number) {
    return this.lightAdRepository.findOne(
      {
        where:{id:id,},
        relations:{createdBy:true,category:true},
      });
  }

 

 
}
