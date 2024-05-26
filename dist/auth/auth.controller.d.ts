import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: CreateUserDto): Promise<{
        token: string;
    } | {
        message: string;
    }>;
    login(signUpDto: CreateUserDto): Promise<{
        token: string;
    } | {
        message: string;
    }>;
}
