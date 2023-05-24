import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // this never gets called, created strategy only to register "local" strategy in passport
  // this is needed for LocalAuthGuard to work
  async validate(_username: any, _password: any, done: CallableFunction) {
    done(new Error('Not implemented'));
  }
}
