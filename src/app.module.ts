import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { LightingAdModule } from './LightingAd/lighting-ad/lighting-ad.module';
import { UserModule } from './User/user/user.module';
import { CategoryModule } from './category/category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig.options), LightingAdModule,UserModule,CategoryModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
