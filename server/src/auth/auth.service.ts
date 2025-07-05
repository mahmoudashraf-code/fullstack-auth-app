import { Injectable, ConflictException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
    constructor(
        public usersService: UsersService,
        private jwtService: JwtService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, name, password } = signupDto;

        this.logger.info('User signup attempt', { email, name });

        // Check if user already exists
        const existingUser = await this.usersService.userRepository.findOne({ where: { email } });
        if (existingUser) {
            this.logger.warn('Signup failed - user already exists', { email });
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = this.usersService.userRepository.create({
            email,
            name,
            password: hashedPassword,
        });

        const savedUser = await this.usersService.userRepository.save(user);

        // Generate JWT token
        const payload = { sub: savedUser._id.toString(), email: savedUser.email };
        const token = this.jwtService.sign(payload);

        this.logger.info('User signup successful', {
            userId: savedUser._id,
            email: savedUser.email,
            name: savedUser.name
        });

        return {
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
            },
            token,
        };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;

        this.logger.info('User signin attempt', { email });

        // Find user by email
        const user = await this.usersService.userRepository.findOne({ where: { email } });
        if (!user) {
            this.logger.warn('Signin failed - user not found', { email });
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn('Signin failed - invalid password', { email });
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { sub: user._id.toString(), email: user.email };
        const token = this.jwtService.sign(payload);

        this.logger.info('User signin successful', {
            userId: user._id,
            email: user.email
        });

        return {
            message: 'Sign in successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    }

    async getCurrentUser(userId: string) {
        this.logger.info('Get current user request', { userId });

        const user = await this.usersService.userRepository.findOneBy({
            _id: new ObjectId(userId),
        });

        if (!user) {
            this.logger.warn('Get current user failed - user not found', { userId });
            throw new UnauthorizedException('User not found');
        }

        this.logger.info('Get current user successful', { userId });

        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
