import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'syedmysql', // replace with your MySQL password
      database: 'nest_auth_db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
