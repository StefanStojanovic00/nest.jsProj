import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./User/user/entities/user.entity";
import { LightingAd } from "./LightingAd/lighting-ad/entities/lighting-ad.entity";
import { Category } from "./category/category/entities/category.entity";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

/*export const  typeOrmConfig: DataSourceOptions =
{
    
          type: 'postgres', 
          host: 'localhost', 
          port: 5432, 
          username: 'postgres', 
          password: '123', 
          database: 'rwabaza', 
          entities: [User,LightingAd,Category],
          synchronize: true, 
    
      
}
*/
config();

const configService = new ConfigService();

export const  typeOrmConfig=new DataSource(
{
    
          type: 'postgres', 
          host: 'localhost', 
          port: 5432, 
          username: 'postgres', 
          password: '123', 
          database: 'rwabaza', 
          entities: [User,LightingAd,Category],
          synchronize: true, 
    
      
})
