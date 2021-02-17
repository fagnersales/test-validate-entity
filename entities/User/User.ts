import { Either, left, right } from '../../shared/Either';
import { Name } from './Name';
import { Email } from './Email';
import { Password } from './Password';
import { UserData } from './userData';
import { InvalidNameError } from './errors/InvalidName';
import { InvalidEmailError } from './errors/InvalidEmail';
import { InvalidPasswordError } from './errors/InvalidPassword';

type EitherUserCreate = Either<
  InvalidNameError | InvalidEmailError | InvalidPasswordError,
  User
>;

type EmailOrError = Either<InvalidEmailError, Email>;
type NameOrError = Either<InvalidNameError, Name>;
type PasswordOrError = Either<InvalidPasswordError, Password>;

export class User {
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  private constructor(name: Name, email: Email, password: Password) {
    this.name = name;
    this.email = email;
    this.password = password;

    Object.freeze(this);
  }

  static create(userData: UserData): EitherUserCreate {
    const emailOrError: EmailOrError = Email.create(userData.email);

    const nameOrError: NameOrError = Name.create(userData.name);

    const passwordOrError: PasswordOrError = Password.create(userData.password);

    if (emailOrError.isLeft()) return left(emailOrError.value);

    if (nameOrError.isLeft()) return left(nameOrError.value);

    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;
    const password: Password = passwordOrError.value;

    return right(new User(name, email, password));
  }
}
