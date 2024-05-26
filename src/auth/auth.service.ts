import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(
    signupDto: CreateUserDto,
  ): Promise<{ token: string } | { message: string }> {
    const { name, email, password } = signupDto;
    let user:User;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      if (error.code === 11000) throw new ConflictException("user aleardy exist")
      throw new InternalServerErrorException("Internal Server Error")
    

  }
}

  async login(loginDto:LoginDto):Promise<{token:string}>{
    const {email,password}=loginDto
    let user:User
      try {
           user=await this.userModel.findOne({email})
        
        } catch (error) {
        
          
        throw new InternalServerErrorException("Internal Error exeception ",error)
      }
      if(!user){
        throw new UnauthorizedException("Invalid Email or Password")
        
      }
      const passwordMatch =await bcrypt.compare(password,user.password)
      if(!passwordMatch){
        throw new UnauthorizedException("password incorrect")
      }
      const token = this.jwtService.sign({ id: user._id });
      return {token}
  }
}