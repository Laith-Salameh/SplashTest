"use client"
import ChatBox from "@/components/ChatBox";
import { InfoCards } from "@/components/InfoCards";
import { MultiplierGraph } from "@/components/MultiplierGraph";
import Table from "@/components/UI/Table";
import { Welcome } from "@/components/Welcome";
import { useSocket } from "@/context/SocketContext";
import { useGameStore } from "@/store/store";
import { useEffect } from "react";
import { ClientInfo, Message } from "@/store/storeTypes";
import { PlayerDashboard } from "@/components/PlayerDashboard";

export default function Home() {
  const { socket, on } = useSocket();
  const {clientInfo, setClientInfo, updateChatMessages} = useGameStore();

  useEffect(()=>{
    on("join-room-success",(data: ClientInfo)=>{
      if(!data) return;
      setClientInfo(data)
    })

    on("user-joined",(data: {userName: string})=>{
      if(!data) return;
      updateChatMessages({content:"I just joined, Hello World!", sender: data.userName});
    })
  },[socket])
  

  return (
    <div className="grid grid-cols-12 gap-5 min-h-[550px]">
     <div className="h-full lg:col-span-4 md:col-span-6 col-span-12">
        {
          (!clientInfo?.gameId) ?  <PlayerDashboard/>: <Welcome/>
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
        headers={["No.","Name","Score"]} 
        data={[{"No.": "1","Name": "test","Score":"100"},{"No.": "1","Name": "test","Score":"100"},{"No.": "1","Name": "test","Score":"100"},{"No.": "1","Name": "test","Score":"100"},{"No.": "1","Name": "test","Score":"100"},]}/>

     </div>
     <div className="min-h-[400px] md:h-full sm:min-h-[150px] md:min-h-[200px] lg:col-span-6 col-span-12 rounded-md">
      <ChatBox />
     </div>
      
    </div>
  );
}
