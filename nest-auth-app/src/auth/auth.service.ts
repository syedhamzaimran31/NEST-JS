import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import bcrypt from 'bcrypt'
// import { default as bcrypt } from 'bcrypt'
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return {
      email: user.email,
      id: user.id,
      access_token,
    };
  }
  async signup(user: User) {
    const existingUser = await this.usersService.findOne(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.usersService.create(user);
  }
}
