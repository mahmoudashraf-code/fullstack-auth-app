import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { GetUser, IGetUserDeco } from 'src/getUser.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async signup(@Body() signupDto: SignupDto) {
        console.log('Received signup request:', signupDto);
        return this.authService.signup(signupDto);
    }

    @Post('login')
    async signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getCurrentUser(@GetUser() user: IGetUserDeco) {
        return this.authService.getCurrentUser(user.sub);
    }
}
