/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
// Correct import without function call
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

const redisStore: Keyv<{ [key: string]: any }> = new Keyv({
  store: new KeyvRedis('redis://redis:6379'),
  namespace: '',
});

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://ganeshgmv004:Manic210797@cluster0.csgisfy.mongodb.net/kaseya',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'user' },
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [redisStore],
          ttl: 600 * 1000,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
