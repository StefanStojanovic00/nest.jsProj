import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/User/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'helpConfig';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule,PassportModule,JwtModule.register({
    secret: JWT_SECRET.secret,
    signOptions: {expiresIn:'1d'},
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
