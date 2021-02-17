import { Either, left, right } from '../../shared/Either';
import { InvalidPasswordError } from './errors/InvalidPassword';

export class Password {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
    Object.freeze(this);
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password));
    }

    return right(new Password(password));
  }

  get value(): string {
    return this.password;
  }

  static validate(password: string): boolean {
    if (!password) return false;

    if (password.length < 8) {
      return false;
    }

    if (password.length > 100) {
      return false;
    }

    return true;
  }
}
