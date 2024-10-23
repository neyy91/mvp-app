import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infrastructure/postgres/repositories';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async auth(username: string, pass: string): Promise<number> {
    return this.repo.auth(username, pass);
  }

  async updatePassword(userId: number, password: string): Promise<void> {
    return this.repo.updatePassword(userId, password);
  }
}
