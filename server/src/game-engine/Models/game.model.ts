import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true, unique: true })
  gameId: string; 

  @Prop()
  userGuids: string[]; 
  
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);