export interface createGameDto {
    gameId : string;
    userId: string[]
}

export interface addUserToGameDto{
    gameId: string;
    userId: string;
}


export interface playerGuess{
    pointsBid: number;
    multiplierGuess: number;
    userId: string;
    isBot: boolean;
}


export interface RoundOutcomesForPlayer{
    userName: string;
    score: number;
    userBid: number;
    userGuess: number; 
    userGain: number ;
    userId: string;
}

export interface BotsInfo{
    score: number;
    userName: string;
    userId: string;
}

export interface PlayRoundRes{
    roundOutcomesForPlayers: RoundOutcomesForPlayer[];
    roundCrashMultiplier: number;
}