import { Module } from '@nestjs/common';
import { UserModule } from './rest/User/User.module';

@Module({
  imports: [ UserModule ],
})
export class AppModule {}
