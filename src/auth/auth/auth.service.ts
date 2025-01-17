import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/User/user/entities/user.entity';
import { JWT_SECRET } from 'helpConfig';

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService)
    {}

    async validateUser(username:string, pass:string): Promise<any>
    {
        const user= await this.userService.findOne(username);
        if(!user)
        {
            return null;

        }

        if(!(await bcrypt.compare(pass, user.password)))
        {
            return null;
        }
        
        const { password, ...result} =user;

        return result;
    }

    async login(user: User)
    {
        const payload={id:user.id,email:user.email,role:user.type};
        return{
            user,
            access_token: this.jwtService.sign(payload,{
                secret:JWT_SECRET.secret,
            }),
        };
    }
}
