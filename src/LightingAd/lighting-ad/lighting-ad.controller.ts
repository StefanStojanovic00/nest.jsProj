import { Controller, Get, Post, Body, Patch, Param, Request, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { LightingAdService } from './lighting-ad.service';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { Roles } from 'src/auth/auth/roles.decorator';
import { ProfileType } from 'src/enum/profileType.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMG_COUNT } from 'helpConfig';


export const fileConf = {
  storage: diskStorage({
    destination: 'C:/STORAGE/rwa-angular/assets',
    filename: (req, file, cb) => {
      const name = uuidv4();
      const ext = file.originalname.split('.').pop();
      cb(null, `${name}.${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new BadRequestException('InvalidImageType'), false);
    }
    cb(null, true);
  },
};

@Controller('lighting-ad')
export class LightingAdController {
  constructor(private  lightingAdService: LightingAdService) {}


  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @Roles(ProfileType.admin,ProfileType.user)
  @UseInterceptors(FilesInterceptor('images',IMG_COUNT,fileConf))
  public create
  (
    @Body() dto:CreateLightingAdDto,
    @Request() request,
    @UploadedFiles() images: Array<Express.Multer.File>,
  )
  {
    return this.lightingAdService.create(dto,images,request.user);
  }


  @Get()
  public get() {
    return this.lightingAdService.getAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.lightingAdService.findOne(id);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('myAds')
  @Roles(ProfileType.admin,ProfileType.user)
  public getByUser(@Request() req)
  {
    return this.lightingAdService.getByUser(req.user.id);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateLightingAdDto: UpdateLightingAdDto) {
    return this.lightingAdService.update(+id, updateLightingAdDto);
  }*/
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  @Roles(ProfileType.admin,ProfileType.user)
  public remove(@Param('id',ParseIntPipe) id: number,@Request() req) {
    return this.lightingAdService.remove(id,req.user.id);
  }

}
