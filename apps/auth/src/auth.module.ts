import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: (configService: ConfigService) => {
      //   const POSTGRES_USER = configService.get('POSTGRES_USER');
      //   const POSTGRES_PASSWORD = configService.get('POSTGRES_PASSWORD');
      //   const POSTGRES_DB = configService.get('POSTGRES_DB');
      //   const POSTGRES_HOST = configService.get('POSTGRES_HOST');
      //   return {
      //     type: 'postgres',
      //     url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`,
      //     autoLoadEntities: true,
      //     entities: [UserEntity],
      //     synchronize: true,
      //   };
      // },
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
