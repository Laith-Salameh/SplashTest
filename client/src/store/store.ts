import { create } from 'zustand';
import {GameState} from "./storeTypes"


export const useGameStore = create<GameState>((set,get) => ({
    clientInfo: null,
    setClientInfo:  (obj) => set({ clientInfo: {...obj} }),

    roundDone: true,
    setRoundDone: (val)=>set({roundDone: val}),

    multiplier: 0,
    setMultiplier: (val)=>set({multiplier: val}),

    speed: 1,
    setSpeed: (speed)=>{set({speed: speed})},

    messages: [],
    updateChatMessages: (message)=>{set((state)=>({ messages: [...state.messages, message]}))},
    sendChatMessage: (data,socket)=>{
      console.log(data)
      socket.emit("chat-message", {...data});
    },

    lastRound: [{"Name": "-","Points": "-","Multiplier":"-"},{"Name": "-","Points": "-","Multiplier":"-"},{"Name": "-","Points": "-","Multiplier":"-"},{"Name": "-","Points": "-","Multiplier":"-"},{"Name": "-","Points": "-","Multiplier":"-"}],
    setLastRound: (obj)=> set({lastRound: [...obj]}),

    leaderBoard: [{"No": 1,"Name": "-","Score":"-"},{"No": 2,"Name": "-","Score":"-"},{"No": 3,"Name": "-","Score":"-"},{"No": 4,"Name": "-","Score":"-"},{"No": 5,"Name": "-","Score":"-"}],
    setLeaderBoard: (val) => set({leaderBoard: [...val]}),
    
    playRound(pointsBid, multiplerGuess, socket) {
      const clientInfo = get().clientInfo;
      const score = get().clientInfo?.score;
      if(clientInfo && score) {
        //remove points
        get().setClientInfo({...clientInfo, score: (score - pointsBid)})
        //play round and send to server
        socket.emit("play-round", {userId: clientInfo.userId, pointsBid: pointsBid, multiplier: multiplerGuess })
      }
      
    },
}));