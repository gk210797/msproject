/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
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
  async createUser(username: string, password: string) {
    const user = new this.userModel({ username, password });
    return await user.save();
  }

  async findUser(username: string) {
    return await this.userModel.findOne({ username });
  }
}
