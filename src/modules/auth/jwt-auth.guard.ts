import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import Express from 'express';

import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(
    @Inject(REQUEST)
    private readonly request: Express.Request,
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  private getTokenFromRequest(request: Express.Request): string | undefined {
    const header = request.get('authorization');
    const [bearer, token] = header?.split(' ') || [];

    if (bearer === 'Bearer' && token) {
      return token;
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async handleRequest() {
    try {
      const token = this.getTokenFromRequest(this.request);
      if (token) {
        const { id } = await this.jwtService.verifyAsync(token);

        const user = await this.userService.findOneById(id);

        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
