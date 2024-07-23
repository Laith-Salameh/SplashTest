import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from '@GameEngine/Models';
import { createChatDto } from './chatDtos';

@Injectable()
export class ChatService {
  constructor(@InjectModel(ChatMessage.name) private chatModel: Model<ChatMessage>) {}

  async create(createChatDto: createChatDto): Promise<ChatMessage> {
    const createdChat = await this.chatModel.create(createChatDto);
    return createdChat;
  }

  async getAllMessagesInGame(gameId: string): Promise<ChatMessage[]> {
    return this.chatModel.find({gameId}).exec();
  }
}
