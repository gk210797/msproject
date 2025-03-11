import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'user' })
  async getusers() {
    console.log('🔵 /test endpoint hit');
    return this.appService.getallUsers();
  }

  @MessagePattern({ cmd: 'authcheck' })
  async authuser() {
    return this.appService.authuser();
  }

  @MessagePattern({ cmd: 'createuser' })
  async createuser(data: { username: string; password: string }) {
    const user = await this.appService.findUser(data.username);
    if (user) {
      return { status: 'error', message: 'User already exists' };
    }
    await this.appService.createUser(data.username, data.password);
    return { status: 'success', message: 'user craeted successfully' };
  }
}
