/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async validateUser(username: string, password: string) {
    if (username === 'admin' && password === '1234') {
      return {
        status: 'success',
        message: 'Login successful22222222222222222222',
      };
    }
    return { status: 'error', message: 'Invalid credentials' };
  }
}
