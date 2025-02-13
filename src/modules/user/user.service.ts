import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories';
import { User } from './schemas';
import { UserDocument } from './types';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly repository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      this.logger.log('creating user...');

      const validateUserEmail = await this.repository.findOne({
        email: data.email,
      });

      if (validateUserEmail) {
        throw new ConflictException(`${validateUserEmail.email} registered`);
      }

      let user = await this.repository.create(data);

      user = await this.repository.save(user);

      this.logger.log('user created successfully');

      return user;
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      this.logger.log('list users...');

      const users = await this.repository.findAll();

      this.logger.log('users listed successfully');

      return users;
    } catch (err) {
      throw err;
    }
  }

  async findOne(_id: string): Promise<UserDocument> {
    try {
      this.logger.log('get user...');

      const user = await this.repository.findOneById(_id);

      this.logger.log('user successfully');

      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(_id: string, data: UpdateUserDto): Promise<User> {
    try {
      this.logger.log('update user...');

      const validateUser = await this.findOne(_id);

      if (isNotEmpty(data.email)) {
        const validateEmail = await this.repository.findOne({
          email: data.email,
        });

        if (validateEmail && validateEmail.id !== validateUser.id) {
          throw new ConflictException(
            'This email is already registered with another user',
          );
        }
      }

      const updateUser = await this.repository.update(
        _id,
        data as UserDocument,
      );

      this.logger.log('user updated successfully');

      return updateUser;
    } catch (err) {
      throw err;
    }
  }

  async remove(_id: string) {
    try {
      this.logger.log('delete user...');

      await this.findOne(_id);

      const deleteUser = await this.repository.delete(_id);

      this.logger.log('user deleted successfully');

      return deleteUser;
    } catch (err) {
      throw err;
    }
  }
}
