/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('User_service') private readonly userclient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'login' })
  async login(data: { username: string; password: string }) {
    return this.appService.validateUser(data.username, data.password);
  }

  @MessagePattern({ cmd: 'authuser' })
  async authuser() {
    console.log('am in auth');
    const result = await firstValueFrom(
      this.userclient.send(
        {
          cmd: 'authcheck',
        },
        {},
      ),
    );
    return result;
  }
}
