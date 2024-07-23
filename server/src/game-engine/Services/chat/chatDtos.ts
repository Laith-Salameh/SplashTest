export interface createChatDto{
    senderUserId: string;
    gameId: string;
    message: string;
    createdAt?: Date;
}