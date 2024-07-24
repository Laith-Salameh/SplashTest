"use client"
import ChatBox from "@/components/ChatBox";
import { InfoCards } from "@/components/InfoCards";
import { MultiplierGraph } from "@/components/MultiplierGraph";
import Table from "@/components/UI/Table";
import { Welcome } from "@/components/Welcome";
import { useSocket } from "@/context/SocketContext";
import { useGameStore } from "@/store/store";
import { useEffect, useState } from "react";
import { ClientInfo, Message, Rank, Round, RoundOutcomesForPlayer } from "@/store/storeTypes";
import { PlayerDashboard } from "@/components/PlayerDashboard";

export default function Home() {
  const { socket, on } = useSocket();
  const {clientInfo, setClientInfo, updateChatMessages, leaderBoard, setLastRound, setLeaderBoard, setMultiplier, roundDone} = useGameStore();

  useEffect(()=>{
    on("join-room-success",(data: ClientInfo)=>{
      if(!data) return;
      setClientInfo(data)
    })

    on("user-joined",(data: {userName: string})=>{
      if(!data) return;
      updateChatMessages({content:"I just joined, Hello World!", sender: data.userName});
    })

    on("chat-message",(data: {message: string, senderUserName: string})=>{
      if(!data) return;
      updateChatMessages({content: data.message, sender: data.senderUserName});
    })
    
    on("play-round-results",(data:{roundCrashMultiplier: number,roundOutcomesForPlayers: RoundOutcomesForPlayer[] })=>{
      const lastRound:Round[] = data.roundOutcomesForPlayers.map(round=>({
        Multiplier: round.userGuess.toFixed(2),
        Name: round.userName,
        Points: Math.abs(round.userGain).toString(),
        color: round.userGain > 0 ? "text-green" : "text-red"
      }))
      setLastRound(lastRound);

      setMultiplier(data.roundCrashMultiplier);

      const player=data.roundOutcomesForPlayers.filter(round=> round.userId == clientInfo?.userId)?.[0];
      console.log(player,clientInfo)
      if(player && clientInfo) setClientInfo({...clientInfo, score: player.score })

      const leaderboards:Rank[] = data.roundOutcomesForPlayers.sort((a,b)=>b.score - a.score).map((round,i)=>({
        No:i,
        Name: round.userName,
        Score: round.score.toString()
      }))
      setLeaderBoard(leaderboards);

    })
  },[socket,clientInfo,setClientInfo,updateChatMessages,setLastRound,setLeaderBoard,setMultiplier])
  

  return (
    <div className="grid grid-cols-12 gap-5 min-h-[550px]">
     <div className="h-full lg:col-span-4 md:col-span-6 col-span-12">
        {
          (clientInfo?.gameId) ?  <PlayerDashboard/>: <Welcome/>
        }
     </div>

     <div className="h-full flex items-center flex-col lg:col-span-8 md:col-span-6 col-span-12 rounded-md gap-2">
        <InfoCards/>
        <MultiplierGraph />
     </div>

     <div className="min-h-[400px] md:h-full sm:min-h-[150px] md:min-h-[200px] lg:col-span-6 col-span-12 rounded-md">

      <Table 
        iconSrc="/images/podium.png"
        title="Ranking"
        headers={Object.keys(leaderBoard?.[0])} 
        data={leaderBoard}
        showResults={roundDone}
        />

     </div>
     <div className="min-h-[400px] md:h-full sm:min-h-[150px] md:min-h-[200px] lg:col-span-6 col-span-12 rounded-md">
      <ChatBox />
     </div>
      
    </div>
  );
}
