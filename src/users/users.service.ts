import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(userName: string, pass: string): Promise<any> {
    console.log(userName);
    const user = await this.userRepository.findOne({
      where: { userName: userName },
    });

    if (user?.password !== pass) {
      throw new NotFoundException('invalid credential');
    }

    const token = sign({ ...user }, 'secret');

    return { token, user };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }
}
