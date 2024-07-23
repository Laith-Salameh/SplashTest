"use client"
import React, {FC} from "react";

export interface InfoCardProps{
    imgSrc: string;
    imageAlt: string;
    text: string | number;
}

export const InfoCard: FC<InfoCardProps> = ({imgSrc,imageAlt, text})=>{
    return (
        <div className="bg-secondary rounded-md h-full p-2 relative flex items-center justify-center">
            <img className="w-[30px] aspect-square absolute left-2" src={imgSrc} alt={imageAlt}/>
            <span className="text-white">{text}</span>
        </div>
    )
}