import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { DatabaseModule } from 'src/db/database.module'
import { ConfigEnum } from 'src/enum/config.enum'
import { UserProviders } from 'src/user/user.providers'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './auth.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ConfigEnum.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(ConfigEnum.JWT_EXPIRES_IN),
          },
        }
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, ...UserProviders],
  controllers: [AuthController],
})
export class AuthModule {}
