"use client"
import React, {FC, useState} from "react";
import { Button } from "./UI/Button";
import { useSocket } from "@/context/SocketContext";

export const Welcome = ()=>{
    const { socket,emit, on} = useSocket();
    const [allowConnect, setAllowConnect] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    
    const buttonHandleClick = ()=>{ 
        name && emit("join-room", {userName: name, userId: socket?.id});
    };

    on("join-room-error", (err)=> {console.error(err)})
    

    const handleChange=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if(newValue.length > 3){
            setAllowConnect(true);
            setName(newValue);
        }
        else{
            setAllowConnect(false);
            setName("");
        }
    };

    return (<div className="bg-secondary p-4 w-full h-full flex items-center flex-col  gap-3 rounded-md justify-center ">
        <h2 className="text-white mb-6 text-2xl">Welcome</h2>
        <span className="text-gray text-xs">Please insert your name</span>
        <input className="bg-black text-white rounded-md p-2 w-full focus:outline-none focus:border-primary" type="text" onChange={handleChange}/>
        <Button text="Accept" disabled={!allowConnect} onClick={buttonHandleClick}/>
    </div>)
}