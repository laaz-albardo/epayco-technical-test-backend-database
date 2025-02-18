import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories';
import { User } from './schemas';
import { UserDocument } from './types';
import { isNotEmpty } from 'class-validator';
import { WalletService } from '../wallet';
import { OrderService } from '../order';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserRepository.name);
  constructor(
    private readonly repository: UserRepository,
    private readonly walletService: WalletService,
    private readonly orderService: OrderService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      this.logger.log('creating user...');

      const validateUserEmail = await this.repository.findOne({
        email: data.email,
      });

      if (validateUserEmail) {
        throw new ConflictException(`${validateUserEmail.email} registered`);
      }

      const validateUserDni = await this.repository.findOne({
        'person.dni': data.person.dni,
      });

      if (validateUserDni) {
        throw new ConflictException(
          `${validateUserEmail.person.dni} registered`,
        );
      }

      const validateUserPhoneNumber = await this.repository.findOne({
        'person.phoneNumber': data.person.phoneNumber,
      });

      if (validateUserPhoneNumber) {
        throw new ConflictException(
          `${validateUserEmail.person.phoneNumber} registered`,
        );
      }

      let user = await this.repository.create(data);

      user = await this.repository.save(user);

      this.logger.log('user created successfully');

      await this.walletService.create({
        balance: 0,
        status: true,
        user: user as User,
      });

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

      if (isNotEmpty(data.person.dni)) {
        const validateUserDni = await this.repository.findOne({
          'person.dni': data.person.dni,
        });

        if (validateUserDni && validateUserDni.id !== validateUser.id) {
          throw new ConflictException(
            'This dni is already registered with another user',
          );
        }
      }

      if (isNotEmpty(data.email)) {
        const validateUserPhoneNumber = await this.repository.findOne({
          'person.phoneNumber': data.person.phoneNumber,
        });

        if (
          validateUserPhoneNumber &&
          validateUserPhoneNumber.id !== validateUser.id
        ) {
          throw new ConflictException(
            'This phone number is already registered with another user',
          );
        }
      }

      const updateUser = await this.repository.update(
        _id,
        data as UserDocument,
      );

      await this.walletService.updateUser(_id, updateUser as any);

      await this.orderService.updateUserOrder(_id, updateUser as any);

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

      await this.walletService.remove(_id);

      const deleteUser = await this.repository.delete(_id);

      this.logger.log('user deleted successfully');

      return deleteUser;
    } catch (err) {
      throw err;
    }
  }
}
