import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '@GameEngine/Models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
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
}
