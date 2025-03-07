/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL ?? ''),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'user' },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
