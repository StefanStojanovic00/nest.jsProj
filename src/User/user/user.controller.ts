import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private  userService: UserService, private authService:AuthService) {}

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
   @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }*/
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
}
