export interface createGameDto {
    gameId : string;
    userId: string[]
}

export interface addUserToGameDto{
    gameId: string;
    userId: string;
}