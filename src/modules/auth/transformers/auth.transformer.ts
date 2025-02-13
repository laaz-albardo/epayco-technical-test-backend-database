import { IUser, UserTransformer } from '@src/modules/user';
import { IToken } from '../interfaces';

export class AuthTransformer {
  public static transform(token: IToken) {
    const user: IUser = token.getUser();
    return {
      user: UserTransformer.transform(user),
      token: token.getHash(),
    };
  }
}
