export interface createGameDto {
    gameId : string;
    userId: string[]
}

export interface addUserToGameDto{
    gameId: string;
    userId: string;
}

export interface playRoundDto{
    gameId: string;
    playerGuesses: playerGuess[];
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
    userIsCorrect: boolean;
    userGain: number ;
}

export interface PlayRoundRes{
    roundOutcomesForPlayer: RoundOutcomesForPlayer[];
    roundCrashMultiplier: number;
}