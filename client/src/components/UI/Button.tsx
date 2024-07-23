"use client"
import React, {FC} from "react";

export interface ButtonProps{
    text: string;
    disabled?: boolean;
    onClick?: (props: any) => void;
    varient?: "full" | "small"; 
}

export const Button: FC<ButtonProps> = ({text , disabled=false, onClick, varient="full"})=>{
    return (
    <button className={`p-2 ${disabled? "bg-gray" : "bg-primary hover:opacity-80"} ${varient=="full" ? "w-full" : "min-w-40"} text-white rounded-md text-center`} 
        disabled={disabled}    onClick={onClick}>
        {text}
    </button>
    )
}