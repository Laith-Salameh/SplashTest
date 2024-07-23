import { create } from 'zustand';
import {GameState} from "./storeTypes"


export const useGameStore = create<GameState>((set,get) => ({
    clientInfo: null,
    setClientInfo:  (obj) => set({ clientInfo: {...obj} }),
    speed: 1,
    setSpeed: (speed)=>{set({speed: speed})},
    messages: [],
    updateChatMessages: (message)=>{set((state)=>({ messages: [...state.messages, message]}))},
    sendChatMessage: (message,socket)=>{
      get().updateChatMessages(message);
      socket.emit("chat-message", {"data": {message}});
    },
    lastRound: null,
    setLastRound: (obj)=> set({lastRound: {...obj}}),
    leaderBoard: [],
    setLeaderBoard: (val) => set({leaderBoard: [...val]}),
    playRound(pointsBid, multiplerGuess, socket) {
      
    },
}));