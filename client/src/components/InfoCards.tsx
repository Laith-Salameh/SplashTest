"use client"
import React, {FC} from "react";
import { InfoCard, InfoCardProps } from "./UI/InfoCard";
import useTime from "@/customhooks/useTime";
import { useGameStore } from "@/store/store";



export const InfoCards: FC = ()=>{
    const time = useTime();
    const {clientInfo} = useGameStore();
    const items: InfoCardProps[] = [
        {imageAlt: "medal", imgSrc: "/images/medal.png" , text: clientInfo ? clientInfo.score: ""},
        {imageAlt: "user", imgSrc: "/images/user.png" , text: clientInfo ? clientInfo.userName: ""},
        {imageAlt: "clock", imgSrc: "/images/clock.png" , text: clientInfo ? time: ""}
    ]
    return (<div className="grid grid-cols-3 gap-4 w-full h-12 mb-2">
        {
            items.map((item,i)=><InfoCard key={i} {...item} />)
        }
      </div>
    )
}