import { IsNotEmpty,IsEmail,IsString, MinLength } from "class-validator";

export class LoginDto {
  
    @IsEmail({},{message:"please correct email "})
    @IsNotEmpty()
    email:string
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string
}