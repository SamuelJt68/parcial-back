// src/auth/jwt.auth.ts
import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  JwtBearerProvider,
  type JwtClaims,
} from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
  constructor(
    private readonly usersService: UsersService,
    registry: AuthenticationRegistry,
  ) {
    super(); 
    registry.registerProvider(this, { order: 1 });
  }

  async validate({ sub }: JwtClaims): Promise<User | null> {
    if (!sub) return null;
    const user = await this.usersService.findByIdWithRoles(sub);
    if (!user || !user.is_active) return null;
    return user;
  }
}