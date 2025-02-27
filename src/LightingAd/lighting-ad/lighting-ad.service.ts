import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';
import { LightingAdDtoSearch } from './dto/search-lighting-ad.dto';
import { User } from 'src/User/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, ILike, Repository } from 'typeorm';
import { LightingAd } from './entities/lighting-ad.entity';
import { Category } from 'src/category/category/entities/category.entity';
import { ProfileType } from 'src/enum/profileType.enum';
import { UPLOAD_DESTINATION } from 'helpConfig';




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
     user: User):Promise<LightingAd>
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

  public async getAll():Promise<LightingAd[]> {
      const ads: LightingAd[] = await this.lightAdRepository.find({
        where:{deleted:false},
        relations: { createdBy: true, category: true 

        }});

    return ads;
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

    if (ad.gallery.length > 0) {
      const { gallery } = ad;

      const fs = require('fs');

      gallery.forEach((img) => {
        const path: string = `${UPLOAD_DESTINATION}/${img}`;
        fs.unlinkSync(path);
      });
    }

    if(!(await this.lightAdRepository.delete(id)))
      return{ success:false};

    return{success:true};

  }


  public async getByUser(id:number) {

    
  
  if (isNaN(id)) {
    throw new BadRequestException('Invalid ID. Numeric value expected.');
  }
    const user:User | null = await this.userRepository.findOne({
      where:{id:id},
      relations:{myAds:true}
    });

    

    if(!user) throw new BadRequestException('invalideUser');
    
    const data =user.myAds.map((ad:LightingAd)=>
    {
      if(!ad.deleted)
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

  async findOne(id: number,user:User) { 
    if (!user) throw new BadRequestException('invalideUser');

    const user2: User= await this.userRepository.findOne(
      {
        where:{id:user.id},
        relations:{favourites:true},

      }
    );


    const ad: LightingAd= await this.lightAdRepository.findOne(
      {
        where:{
          id:id,
        },
        relations:{createdBy:true, category:true},
      }
    );

    if (!ad) throw new BadRequestException('AdNotFounde');

    /*const isSaved:boolean=!!user2.favourites.find((fav)=>
    {
      return fav.id===ad.id;
    });*/
    const isSaved: boolean = !!user2.favourites.find(fav => fav.id === ad.id);
    

    const data=
    {
      ...ad,
      isSaved:isSaved,
    };

    return data;

  }

 
  async update(updateLightingAdDto: UpdateLightingAdDto, images: Array<Express.Multer.File>, user: User):Promise<LightingAd> {
    if(!user) throw new BadRequestException ('invalideUser');
    
    const ad:LightingAd= await this.lightAdRepository.findOne(
      {
        where:{
          id:updateLightingAdDto.id
        },
        relations:{ category:true}
      }
    );


    if(!ad) throw new BadRequestException('LightingAdNotFounde');

    const category:Category= await this.categoryRepository.findOne(
      {
        where:{id:updateLightingAdDto.categoryID},
      }
    );

    if(!category) throw new BadRequestException('invalideCategory');
  
    
    ad.title=updateLightingAdDto.title;
    ad.description=updateLightingAdDto.description;
    ad.brand=updateLightingAdDto.brand;
    ad.price=updateLightingAdDto.price;
    ad.category=category;


    let imgs:string[] =[];
    if(images.length!==0)
    {
      images.forEach((img)=>imgs.push(img.filename));

      const fs=require('fs');
      ad.gallery.forEach(img=>
      {
        fs.unlinkSync(`${UPLOAD_DESTINATION}/${img}`)
      }
      )
    }
    else
    {
      imgs=updateLightingAdDto.gallery;
    }

    ad.gallery=imgs;
    if(!(await this.lightAdRepository.update(updateLightingAdDto.id,ad))) return null;

    return ad;
  }

  async getByUserSaved(accesUser: User) {
    if(!accesUser)throw new BadRequestException('invalideUser');

    const user:User= await this.userRepository.findOne({
      where:{id:accesUser.id},
      relations:{favourites:true},
    });

    const data= user.favourites.map((ad:LightingAd)=>
    {
      if(!ad.deleted)
      return{
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

  async getBySearch(dto: LightingAdDtoSearch):Promise<LightingAd[]> {
    /*const {searchInput, categoryId }= dto;

    let ads:LightingAd[];

    if(categoryId)
    {
      ads=await this.lightAdRepository.find(
        {
          relations:['category'],
            where:{ deleted:false,
                category:{id:categoryId},
            },
        },
      );
    }
    else{
      ads= await this.lightAdRepository.find();
    }

    //mozda dodati i ako se nalazi u descrpciji idk 
    if(searchInput.length>0)
    {
      ads=ads.filter(ad=>
      {
        ad.title.includes(searchInput) || ad.brand.includes(searchInput) 
      }
      );

    }
    return ads;*/
    const { searchInput, categoryId } = dto;
  
  let whereCondition: any = { deleted: false };

  if (categoryId) {
    whereCondition.category = { id: categoryId };
  }

  if (searchInput && searchInput.length > 0) {
    whereCondition = [
      { ...whereCondition, title: ILike(`%${searchInput}%`) },
      { ...whereCondition, brand: ILike(`%${searchInput}%`) }
    ];
  }

  const ads = await this.lightAdRepository.find({
    relations: ['category'],
    where: whereCondition,
  });

  return ads;

  }

  async softDelet(dto: UpdateLightingAdDto, Userid: number) {
    const { id }=dto;

    const user:User = await this.userRepository.findOne(
      {
        where:{id:Userid},
    
      }
    );

    if(!user) throw new BadRequestException('invalideUser');

    if (!user || user.type !== ProfileType.admin)
      throw new BadRequestException('Forbidden');

    const ad:LightingAd = await this.lightAdRepository.findOne(
      {
        where:{id:id}
      }
    );

    if(!ad) throw new BadRequestException('adNotFounded');

    ad.deleted=true;

    if(!(await this.lightAdRepository.update(ad.id,ad)))
      return { success: false };

    return { success: true };
  }
 
 
 
 
}
