import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'user' })
  async getusers() {
    return this.appService.getallUsers();
  }

  @MessagePattern({ cmd: 'authcheck' })
  async authuser() {
    return this.appService.authuser();
  }
}
