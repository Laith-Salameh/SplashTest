import { Injectable, Inject, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '@GameEngine/Models';
import { RoundService } from '../round/round.service';
import { BotsInfo, playerGuess, PlayRoundRes, RoundOutcomesForPlayer } from './gameDtos';
import { UserService } from '../user/user.service';

@Injectable()
export class GameService {
  private BotsInfo: BotsInfo[] = [];

  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @Inject(RoundService) private readonly roundService: RoundService,
    @Inject(UserService) private readonly userService: UserService
  ) {
      this.BotsInfo = Array(4).fill(null).map((_,i)=>({ userId: `Bot ${i}`, userName: `Bot ${i}`, score: 1000}));
  }


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


  private generateBid(currentpoints: number){
    return Math.floor(Math.random() * currentpoints);
  }

  generateBotsGuess(): playerGuess[]{
    return this.BotsInfo.map(bot=>({
      pointsBid: this.generateBid(bot.score),
      multiplierGuess: this.generateMultiplier(),
      userId: bot.userId,
      isBot: true,
    }))
  }

  async playRound(gameId: string, playerGuesses: playerGuess[]): Promise<PlayRoundRes | null>{
    const multiplier = this.generateMultiplier();
    const roundResults:RoundOutcomesForPlayer[] = []
    for (const guess of playerGuesses) {
      try {
        const round = await this.roundService.createRound({...guess,gameId:gameId} , multiplier);
        const BotScore = guess.isBot? this.BotsInfo.filter(x=>x.userId == guess.userId)?.[0]?.score : 0;
        const user = !guess.isBot
        ? await this.userService.updateUserPoints({ score: round.roundOutcome, userId: guess.userId })
        : { userId: guess.userId,userName: guess.userId, score:  Math.max(BotScore + round.roundOutcome, 0)}; 
        
        roundResults.unshift({
          userName: user.userName,
          score: user.score,
          userBid: guess.pointsBid,
          userGuess: guess.multiplierGuess,
          userGain: round.roundOutcome,
          userId: user.userId
        });
      } catch (error) {
        console.error('Error processing player guess:', error);
      }
    }
    return { roundCrashMultiplier: multiplier ,roundOutcomesForPlayers: roundResults};
  }
}
