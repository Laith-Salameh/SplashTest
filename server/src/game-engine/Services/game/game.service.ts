import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '@GameEngine/Models';
import { v4 as uuidv4 } from 'uuid';
import { RoundService } from '../round/round.service';
import { playRoundDto, PlayRoundRes, RoundOutcomesForPlayer } from './gameDtos';
import { createRoundDto } from '../round/roundDtos';
import { UserService } from '../user/user.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @Injectable(RoundService) private readonly roundService: RoundService,
    @Injectable(UserService) private readonly userService: UserService
  ) {}

  async createGame(gameId: string, userGuid: string): Promise<Game> {
    try {
      const newGame = { gameId: gameId, userGuids: [] };
      const newCreatedGame = await this.gameModel.create(newGame);

      const updatedGame = await this.addUserToGame(gameId, userGuid);
      return updatedGame || newCreatedGame;
    } catch (error) {
      console.error('Error while creating Game', error);
      throw error;
    }
  }

  async addUserToGame(gameId: string, userGuid: string): Promise<Game | null> {
    try {
      const game = await this.gameModel.findOne({ gameId });
      if (game) {
        game.set({ userGuids: game.userGuids.concat(userGuid) });
        const savedGame = await game.save();
        return savedGame;
      } else {
        console.error('Game with code', gameId, 'not found');
        return null;
      }
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  }

  private generateMultiplier(){
    return (Math.random()) * 10;
  }

  async playRound(data: playRoundDto): Promise<PlayRoundRes | null>{
    const {gameId, playerGuesses } = data;
    const multiplier = this.generateMultiplier();
    const res:RoundOutcomesForPlayer[] = []
    playerGuesses.forEach(async(guess)=>{
      //create round and use the outcome to update user points accordingly
      const round = await this.roundService.createRound({...guess,gameId:gameId} , multiplier )
      const user= await this.userService.updateUserPoints({score: round.roundOutcome, userId: guess.userId})
      res.push({
        userName: user.userName, 
        score: user.score, 
        userBid: guess.pointsBid, 
        userGuess: guess.multiplierGuess, 
        userIsCorrect: round.isCorrect,
        userGain: round.roundOutcome 
      })
    })
    return { roundCrashMultiplier: multiplier ,roundOutcomesForPlayer: res};
  }
}
