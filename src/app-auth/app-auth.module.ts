import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AppAuthController } from './app-auth.controller';
import { AppAuthService } from './app-auth.service';

@Module({
  imports: [UserModule],
  providers: [AppAuthService],
  controllers: [AppAuthController],
})
export class AppAuthModule {}
