/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Controller()
export class AppController {
  constructor(  @Inject('Notification_service') private readonly notificationclient:ClientProxy , @Inject ('Payment_service') private readonly paymentclient:ClientProxy , @Inject("settings_service") private readonly settingclient: ClientProxy) {}

  
@Get('notification')
async notificationChecking(){
  const result = await firstValueFrom(
    this.notificationclient.send({cmd:"notification"},{})
  )
  return result
}



@Get("checkpayment")
async checkpayment(){
  const result = await firstValueFrom(
    this.paymentclient.send({cmd:"checkpayment"},{})
  )
  return result
}
@Get("checksettings")
async checksettings(){
  const result = await firstValueFrom(
    this.settingclient.send({cmd:"checksettings"},{})
  )
  return result
}
}
