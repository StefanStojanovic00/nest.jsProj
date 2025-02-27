import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS, UPLOAD_DESTINATION } from 'helpConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightingAd } from 'src/LightingAd/lighting-ad/entities/lighting-ad.entity';

@Injectable()
export class UserService {
  
 
  constructor(@InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(LightingAd) private LightingAdRepository:Repository<LightingAd>
)
    {} 

    
     async create(userDto: CreateUserDto): Promise<User | undefined> {
      const { email, password } = userDto;
  
      if (!email || !password) {
        throw new Error('MissingFields');
      }
  
      if (await this.findOne(email)) {
        throw new Error('EmailAlreadyRegistered');
      }
  
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      const user = new User();
      user.firstName = userDto.firstName;
      user.lastName = userDto.lastName;
      user.phone = userDto.phone;
      user.email = email;
      user.password = hashedPassword;
      user.favourites = [];
      
  
      return this.userRepository.save(user);
    }

    async toggleSave(adId: number, accesUser: User) {
      if(!accesUser)throw new BadRequestException('invalideUser');

      const user:User= await this.userRepository.findOne({
        where:{id:accesUser.id},
        relations:{favourites:true},
      });
      
      const isAlredySaved=user.favourites.find(
        (fav)=> fav.id===adId,
      );

      let ad:LightingAd;

      if(!isAlredySaved)
      {
        ad=await this.LightingAdRepository.findOne({
          where:{id:adId},
        });
      }

      user.favourites=isAlredySaved ? 
      user.favourites = user.favourites.filter((fav) => fav.id !== adId)
      //user.favourites.filter((fav)=> fav.id=adId)
      :
      [...user.favourites,ad];

      if(!(await this.userRepository.save(user))) return {success: false};
        
        return  { success: true, saved: !isAlredySaved };;
    }

    async editProfile(accesUser: User, dto: UpdateUserDto, img: Express.Multer.File) {
      console.log('uso');
      const{ firstName, lastName, phone, password} = dto;

      console.log('uso',img);

      const user:User = await this.userRepository.findOne(
        {
          where:{id:accesUser.id},
          select:{
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            password:true,
            type: true,
            imagePath: true,
          },
        }
      );


      if(!accesUser)throw new  BadRequestException('invalideUser');

      user.firstName = firstName || user.firstName;  
      user.lastName = lastName || user.lastName;
      user.phone = phone || user.phone;
      user.password = password || user.password;


      
      if(img)
      {
        const { imagePath } = user;
        const fs = require('fs');
  
        if (imagePath) {
          fs.unlinkSync(`${UPLOAD_DESTINATION}/${imagePath}`);
        }
        user.imagePath=img.filename;
        
      }

      if (!(await this.userRepository.update(user.id, user)))
        return { success: false };
      
      console.log('user',user.imagePath);
      return user;
    }
  
    async findOne(email: string): Promise<User | undefined> {
      return this.userRepository.findOneBy({ email: email });
    }
      public getAll() {
        return this.userRepository.find();
      }

      public async delete(id: number) {
        return await this.userRepository.delete(id);
      }

}
