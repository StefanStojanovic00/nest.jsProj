import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, UseInterceptors, Req, UploadedFile, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { ProfileType } from 'src/enum/profileType.enum';
import { Roles } from 'src/auth/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_CONF } from 'helpConfig';

@Controller('user')
export class UserController {
  constructor(private  userService: UserService, private authService:AuthService) {}

 @Post('register')
  public addUser(@Body() dto:CreateUserDto)
  {
    return this.userService.create(dto);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req)
  {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
  @Get()
  public getUsers() {
    return this.userService.getAll();
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('toggleSave/:id')
  @Roles(ProfileType.admin,ProfileType.user)
  public async toggleSave(@Request() req,
    @Param('id',ParseIntPipe) adId:number)
  {
    return this.userService.toggleSave(adId,req.user)
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put('edit-profil')
  @Roles(ProfileType.admin,ProfileType.user)
  @UseInterceptors(FileInterceptor('image',FILE_CONF))
  editProfile(@Request() req, @Body() dto:UpdateUserDto,@UploadedFile()img:Express.Multer.File)
  {
    return this.userService.editProfile(req.user,dto,img);
  }

}
