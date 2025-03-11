/* eslint-disable @typescript-eslint/require-await */
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getallUsers() {
    console.log('🟢 getallUsers() function called!');
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
    const cacheKey = `user:${username}`;

    console.log(` Deleting existing cache for: ${cacheKey}`);
    await this.cacheManager.del(cacheKey);

    console.log(` Saving new user to DB: ${username}`);
    await user.save();

    return { message: 'User created successfully!' };
  }

  async findUser(username: string) {
    const cacheKey = `user:${username}`;

    console.log(` Looking for key: ${cacheKey}`);

    const cachedUser = await this.cacheManager.get(cacheKey);
    console.log(` Cached user:`, cachedUser);

    if (cachedUser) {
      console.log(`Returning cached user`);
      return cachedUser;
    }

    console.log(` User not found in cache. Fetching from DB...`);
    const user = await this.userModel.findOne({ username });

    if (user) {
      console.log(` Storing key in Redis: ${cacheKey}`);
      await this.cacheManager.set(cacheKey, user, 0);
      console.log(` Key ${cacheKey} added to Redis tracking list.`);
    }

    return user;
  }
}
