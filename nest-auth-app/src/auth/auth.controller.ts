import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {
    return this.authService.login(req.email, req.password);
  }
  @Post('signup')
  async signup(@Body() req) {
    console.log(req.body);
    return this.authService.signup(req);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
