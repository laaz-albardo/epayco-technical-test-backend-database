import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from '@src/shared';
import { FastifyRequest } from 'fastify';
import { AuthAll } from '../auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @AuthAll()
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @AuthAll()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @AuthAll()
  @Patch()
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Req() req: FastifyRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req['user']._id, updateUserDto);
  }

  @AuthAll()
  @Delete('delete-me')
  @HttpCode(HttpStatus.ACCEPTED)
  removeUser(@Req() req: FastifyRequest) {
    return this.userService.remove(req['user']._id);
  }

  @AuthAll()
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.userService.remove(id);
  }
}
