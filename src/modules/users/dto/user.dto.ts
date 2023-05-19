import { IsNotEmpty } from 'class-validator';

export class UserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
