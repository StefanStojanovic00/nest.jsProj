import { Controller, Get, Post, Body, Patch, Param, Request, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, ParseIntPipe, Put, Query } from '@nestjs/common';
import { LightingAdService } from './lighting-ad.service';
import { CreateLightingAdDto } from './dto/create-lighting-ad.dto';
import { UpdateLightingAdDto } from './dto/update-lighting-ad.dto';
import { LightingAdDtoSearch } from './dto/search-lighting-ad.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { Roles } from 'src/auth/auth/roles.decorator';
import { ProfileType } from 'src/enum/profileType.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMG_COUNT, FILE_CONF } from 'helpConfig';



@Controller('lighting-ad')
export class LightingAdController {
  constructor(private  lightingAdService: LightingAdService) {}


  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @Roles(ProfileType.admin,ProfileType.user)
  @UseInterceptors(FilesInterceptor('images',IMG_COUNT,FILE_CONF))
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles(ProfileType.admin,ProfileType.user)
  findOne(@Param('id',ParseIntPipe) id: number,@Request() req) {
    return this.lightingAdService.findOne(id,req.user);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('myAds')
  @Roles(ProfileType.admin,ProfileType.user)
  public getByUser(@Request() req)
  {
    return this.lightingAdService.getByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(ProfileType.admin,ProfileType.user)
  @Put()
  @UseInterceptors(FilesInterceptor('images', IMG_COUNT, FILE_CONF))
  update(
     @Body() updateLightingAdDto: UpdateLightingAdDto,
      @Request() req,
      @UploadedFiles() images: Array<Express.Multer.File>
    ) {
    return this.lightingAdService.update(updateLightingAdDto, images,req.user);
  }



  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  @Roles(ProfileType.admin,ProfileType.user)
  public remove(@Param('id',ParseIntPipe) id: number,@Request() req) {
    return this.lightingAdService.remove(id,req.user.id);
  }

  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(ProfileType.admin,ProfileType.user)
  @Get('saveAds')
  getByUserSaved(@Request()req)
  {
    return this.lightingAdService.getByUserSaved(req.user);
  }

  @Get('search')
  search(@Query() dto:LightingAdDtoSearch)
  {
    return this.lightingAdService.getBySearch(dto);

  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(ProfileType.admin)
  @Patch('softDelete')
  softDelete(@Body() dto:UpdateLightingAdDto,@Request() req)
  {
    return this.lightingAdService.softDelet(dto,req.user.id)
  }
  
}
