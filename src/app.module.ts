import { Module } from '@nestjs/common';
import { UserModule } from './rest/User/User.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule 
  ],
})
export class AppModule {}
