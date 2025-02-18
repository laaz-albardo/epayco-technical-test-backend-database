import { Injectable } from '@nestjs/common';
import { LoginUseCase } from './useCases';
import { UserRepository, IUser, User } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  async login(user: any): Promise<any> {
    return this.loginUseCase.loginUser(user);
  }

  async profile(user: IUser): Promise<User> {
    return await this.userRepository.findOne(user._id as any);
  }
}
