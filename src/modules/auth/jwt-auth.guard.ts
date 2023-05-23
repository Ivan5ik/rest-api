import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request.headers);

    try {
      const secretKey = 'your_secret_key';
      const payload = jwt.verify(token, secretKey) as any;

      request.user = payload; // Присвоение декодированной нагрузки объекту запроса

      return super.canActivate(context);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(headers: IncomingHttpHeaders): string {
    // Извлекаем токен из заголовка Authorization Bearer
    const authHeader = headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    throw new UnauthorizedException('Token not found');
  }
}
