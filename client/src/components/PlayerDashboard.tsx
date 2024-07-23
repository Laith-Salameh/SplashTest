"use client"
import React, {FC, useState} from "react";
import { Button } from "./UI/Button";
import { useSocket } from "@/context/SocketContext";
import { PlayerControls } from "./PlayerControls";
import Table from "./UI/Table";
import Slider from "./UI/Slider";
import TitleLayout from "./UI/TitleLayout";
import { useGameStore } from "@/store/store";

export const PlayerDashboard = ()=>{
    const { socket,emit, on} = useSocket();
    const {setSpeed} = useGameStore();
    
    const buttonHandleClick = ()=>{ 
        emit("joinRoom", {userName: name, userId: socket?.id});
    };



    return (<div className="w-full flex flex-col gap-2">
        <PlayerControls/>
        <Table 
            title="Current Round" 
            iconSrc="/images/trophy.png"
            rowPadding="py-1.5"
            headers={["Name","Points","Multiplier"]} 
            data={[{"Name": "name","Points": "-","Multiplier":"-"},{"Name": "name","Points": "-","Multiplier":"-"},{"Name": "name","Points": "-","Multiplier":"-"},{"Name": "name","Points": "-","Multiplier":"-"},{"Name": "name","Points": "-","Multiplier":"-"},]}
        />
        <TitleLayout title="Speed" iconSrc="/images/fast.png">
            <Slider onChange={(val)=>{setSpeed(val)}} max={5} min={1}/>
        </TitleLayout>
    </div>)
}