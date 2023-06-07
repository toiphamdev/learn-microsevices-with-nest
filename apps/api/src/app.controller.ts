import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.authService.send({ cmd: 'get-user' }, {});
  }

  @Post('/register')
  register() {
    return this.authService.send({ cmd: 'register' }, {});
  }
}
