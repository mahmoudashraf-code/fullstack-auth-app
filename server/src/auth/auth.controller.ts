import { Controller, Post, Body, Get, UseGuards, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { GetUser, IGetUserDeco } from 'src/getUser.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    @Post('register')
    async signup(@Body() signupDto: SignupDto) {
        this.logger.info('Received signup request', { email: signupDto.email, name: signupDto.name });
        return this.authService.signup(signupDto);
    }

    @Post('login')
    async signin(@Body() signinDto: SigninDto) {
        this.logger.info('Received signin request', { email: signinDto.email });
        return this.authService.signin(signinDto);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getCurrentUser(@GetUser() user: IGetUserDeco) {
        this.logger.info('Received get current user request', { userId: user.sub });
        return this.authService.getCurrentUser(user.sub);
    }
}
