import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Round } from '@GameEngine/Models';
import { createRoundDto } from './roundDtos';

@Injectable()
export class RoundService {
    constructor(@InjectModel(Round.name) private readonly roundModel: Model<Round>) {
    }
  
    async createRound(dto: createRoundDto, generatedMultiplier: number): Promise<Round> {
      const isCorrect = dto.multiplierGuess < generatedMultiplier;
      const multiplier = isCorrect? dto.multiplierGuess : -1;
      const roundOutcome = multiplier * dto.pointsBid; 
      
      const newRound = new Round(dto);
      newRound.isCorrect = isCorrect;
      newRound.roundOutcome= roundOutcome;
      
      const round = await this.roundModel.create(newRound);
      return round;
    }
  
}
