import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
