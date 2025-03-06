/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getallUsers() {
    return {
      message: 'as of now no users',
    };
  }
  async authuser() {
    return {
      message: 'authenticated userrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
    };
  }
}
