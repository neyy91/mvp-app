import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Request() req, @Body() body: Record<string, any>) {
    return !!this.authService.updatePassword(req.user, body.password);
  }
}
