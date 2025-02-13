import { IUser } from '../interfaces';

export class UserTransformer {
  public static transform(user: IUser) {
    return {
      id: user._id,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}
