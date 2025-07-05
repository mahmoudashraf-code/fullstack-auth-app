import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello() {
    return {
      message: 'Welcome to the Fullstack Auth App API!',
      version: '1.0.0',
      description: 'This API provides authentication and user management features for the Fullstack Auth App.'
    }
  }
}
