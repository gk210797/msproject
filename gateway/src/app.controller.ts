/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authclient: ClientProxy , @Inject('User_service') private readonly userclient:ClientProxy , @Inject('Notification_service') private readonly notificationclient:ClientProxy , @Inject ('Payment_service') private readonly paymentclient:ClientProxy , @Inject("settings_service") private readonly settingclient: ClientProxy) {}

  @Get('send')  
async sendMessage() {
  const result = await firstValueFrom(
    this.authclient.send({ cmd: 'login' }, { username: 'admin', password: '1234' })
  );
  return result;
}
@Get('user')
async sendWelcome(){
  const result = await firstValueFrom(
    this.userclient.send({cmd:"user"},{})
  )
  return result;
}
@Get('auth')
async authchecking(){
  console.log("am in gateway")
  const result = await firstValueFrom(
   
    this.authclient.send({
      cmd:"authuser"
    },{})
  )
  return result
}
@Get('notification')
async notificationChecking(){
  const result = await firstValueFrom(
    this.notificationclient.send({cmd:"notification"},{})
  )
  return result
}

@Post("createuser")
async createuser(@Body() data: {username: string; password: string}){
  const result = await firstValueFrom(
    this.userclient.send({cmd:"createuser"},data)
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
