import { Socket } from "socket.io-client";

export interface GameState {
    clientInfo: ClientInfo | null;
    setClientInfo: (val: ClientInfo) => void;
    speed: number;
    setSpeed: (val: number)=>void;
    messages: Message[];
    updateChatMessages: (message: Message)=>void;
    sendChatMessage: (message: Message, socket: Socket) => void;
    lastRound: Round | null;
    setLastRound: (round: Round) => void;
    leaderBoard: Rank[];
    setLeaderBoard: (val: Rank[])=> void;
    playRound: (pointsBid: number, multiplerGuess: number, socket: Socket) => void;
}

export interface ClientInfo{
    clientId: string;
    userName: string;
    score: number;
    gameId: string;
}

export interface Round{
    name: string;
    bid: number;
    multiplier: number;
    crashMultipler: number;
}

export interface Rank{
    No: number;
    name: string;
    score: number;
}

export interface Message {
    sender: string;
    content: string;
}