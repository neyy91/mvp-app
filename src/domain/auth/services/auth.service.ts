import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/domain/users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const userId = await this.usersService.auth(username, pass);

    if (!userId) {
      throw new UnauthorizedException();
    }
    const payload = { userId, username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updatePassword(user, password: string): Promise<void> {
    return this.usersService.updatePassword(user.userId, password);
  }
}
