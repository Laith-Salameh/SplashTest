import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@GameEngine/Models';
import { createUserDto, updateUserDto } from './userDtos';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(dto : createUserDto): Promise<User> {
    const res = await this.userModel.create(dto);
    return res;
  }

  async getUser(userId: string): Promise<User | null> {
    return await this.userModel.findOne({ userId });
  }

  async updateUserPoints( dto: updateUserDto): Promise<User> {
    const user = await this.getUser(dto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    //userpoints cant get under 0
    user.score = Math.max(user.score + dto.score, 0);
    return await user.save();
  }
}