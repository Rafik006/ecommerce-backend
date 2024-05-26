import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post("/signup")
    signUp(@Body() signUpDto:CreateUserDto):Promise<{token:string}|{ message: string }>{
        return this.authService.signUp(signUpDto)
    }
    @Post("/login")
    login(@Body() signUpDto:CreateUserDto):Promise<{token:string}|{ message: string }>{
        return this.authService.login(signUpDto)
    }
}
