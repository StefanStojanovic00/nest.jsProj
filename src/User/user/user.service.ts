import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'helpConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>)
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
