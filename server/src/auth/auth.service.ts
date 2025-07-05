import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        public usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, name, password } = signupDto;

        // Check if user already exists
        const existingUser = await this.usersService.userRepository.findOne({ where: { email } });
        if (existingUser) {
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

        // Find user by email
        const user = await this.usersService.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { sub: user._id.toString(), email: user.email };
        const token = this.jwtService.sign(payload);

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
        const user = await this.usersService.userRepository.findOneBy({
            _id: new ObjectId(userId),
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
