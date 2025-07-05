import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from "express";

export const GetUser = createParamDecorator((data: Request, ctx: ExecutionContext): IGetUserDeco => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
});

export interface IGetUserDeco {
    sub: string;
    email: string;
}