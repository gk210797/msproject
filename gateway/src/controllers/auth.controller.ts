/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authclient: ClientProxy,
  ) {}
  @Get('send')
  async sendMessage() {
    const result = await firstValueFrom(
      this.authclient.send(
        { cmd: 'login' },
        { username: 'admin', password: '1234' },
      ),
    );
    return result;
  }
  @Get('auth')
  async authchecking() {
    console.log('am in gateway');
    const result = await firstValueFrom(
      this.authclient.send(
        {
          cmd: 'authuser',
        },
        {},
      ),
    );
    return result;
  }
}
