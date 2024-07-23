import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ChatMessage extends Document {
  @Prop()
  senderUserId: string;

  @Prop()
  gameId: string;

  @Prop()
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
