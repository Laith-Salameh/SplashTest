"use client"
import React, {FC, useState} from "react";
import { Button } from "./UI/Button";
import { useSocket } from "@/context/SocketContext";
import NumberInput from "./UI/NumberInput";
import { useGameStore } from "@/store/store";

export const PlayerControls = ()=>{
    const { socket, on, emit} = useSocket();
    const {clientInfo, playRound } = useGameStore();
    const [bid, setBid] = useState(100);
    const [multiplier, setMulitpluer ] = useState(1.5);
    
    const buttonHandleClick = ()=>{ 
        if(!socket) return;
        playRound(bid,multiplier,socket);
    };



    return (<>
            <div className="grid grid-cols-2 gap-8">
                <NumberInput value={bid} onChange={(val)=>{setBid(val)}} label="Points" max={clientInfo?.score ?? 1000} min={0} className="col-span-1" step={50} varient="int"/>
                <NumberInput value={multiplier} onChange={(val)=>{setMulitpluer(val)}} label="Multiplier" max={10} min={1} className="col-span-1" varient="float" step={0.25}/>
            </div>
            <Button text="Send" onClick={buttonHandleClick} varient="full"/>
        </>)
}