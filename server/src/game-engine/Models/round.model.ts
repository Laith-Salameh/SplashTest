import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Round extends Document {
    @Prop()
    userId: string;

    @Prop()
    gameId: string;
  
    @Prop()
    multiplierGuess: number; 

    @Prop()
    pointsBid: number;
  
    @Prop()
    isCorrect: boolean; 

    @Prop()
    roundOutcome: number;

    @Prop({ default: Date.now, required: false })
    createdAt: Date;
}

export const RoundSchema = SchemaFactory.createForClass(Round);
