/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class UserController {
  constructor(
    @Inject('User_service') private readonly userclient: ClientProxy,
  ) {}

  @Post('createuser')
  async createuser(@Body() data: { username: string; password: string }) {
    const result = await firstValueFrom(
      this.userclient.send({ cmd: 'createuser' }, data),
    );
    return result;
  }
}
