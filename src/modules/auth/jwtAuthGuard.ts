import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Отримати результат гуарда
    const result = context.switchToHttp().getResponse();

    return true;
  }
}
