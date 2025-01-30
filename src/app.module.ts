import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { LightingAdModule } from './LightingAd/lighting-ad/lighting-ad.module';
import { UserModule } from './User/user/user.module';
import { CategoryModule } from './category/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ROOT_PATH } from 'helpConfig';
import { AuthModule } from './auth/auth/auth.module';




@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),ServeStaticModule.forRoot({
    rootPath:ROOT_PATH,
    renderPath:'/'
  }), LightingAdModule,UserModule,CategoryModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
