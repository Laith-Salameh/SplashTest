import { Module } from '@nestjs/common';
import { GameService, UserService, ChatService, RoundService } from '@GameEngine/Services/';
import { GameEngineGateway } from './game-engine.gateway';
import { ChatMessageSchema, GameSchema, RoundSchema, UserSchema } from '@GameEngine/Models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Round', schema: RoundSchema },
            { name: 'Game', schema: GameSchema },
            { name: 'User', schema: UserSchema },
            { name: 'ChatMessage', schema: ChatMessageSchema },
        ]),
    ],
    providers:[GameService, UserService, ChatService, GameEngineGateway, RoundService ],
    exports: []
})
export class GameEngineModule {}
