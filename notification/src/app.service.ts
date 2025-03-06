/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sendnotification() {
    return {
      message: 'notification sent',
    };
  }
}
