import { Socket } from "socket.io-client";

export interface GameState {
    multiplier: number;
    setMultiplier: (val: number)=>void;

    roundDone: boolean;
    setRoundDone: (val: boolean)=>void;

    speed: number;
    setSpeed: (val: number)=>void;

    clientInfo: ClientInfo | null;
    setClientInfo: (val: ClientInfo) => void;

    messages: Message[];
    updateChatMessages: (message: Message)=>void;
    sendChatMessage: (message: SendMessage, socket: Socket) => void;

    lastRound: Round[];
    setLastRound: (round: Round[]) => void;

    leaderBoard: Rank[];
    setLeaderBoard: (val: Rank[])=> void;

    playRound: (pointsBid: number, multiplerGuess: number, socket: Socket) => void;
}

export interface ClientInfo{
    userId: string;
    userName: string;
    score: number;
    gameId: string;
}

export interface Round{
    Name: string;
    Points: string;
    Multiplier: string;
}

export interface Rank{
    No: number;
    Name: string;
    Score: number | string;
}

export interface Message {
    sender: string;
    content: string;
}

export interface SendMessage{
    userId: string;
    message: string;
}


export interface RoundOutcomesForPlayer{
    userName: string;
    score: number;
    userBid: number;
    userGuess: number; 
    userGain: number ;
    userId: string;
}