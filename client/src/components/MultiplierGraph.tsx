"use client"
import { useGameStore } from "@/store/store";
import React, {FC, useState, useEffect} from "react";
import LineGraph from "@/components/UI/LineGraph"

  

export const MultiplierGraph: FC = ({})=>{
    const {multiplier,speed, setRoundDone} = useGameStore();
    const [value, setValue] = useState(0)
    const duration = (10 - speed) * 100;

    useEffect(() => {
        setRoundDone(false);
        const start = performance.now();
    
        const updateValue = (currentTime: number) => {
          const elapsedTime = currentTime - start;
          const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
          const newValue = progress * multiplier;
          setValue(newValue);
    
          if (progress < 1) {
            setRoundDone(true);
            requestAnimationFrame(updateValue);
          }
        };
    
        requestAnimationFrame(updateValue);
      }, [multiplier, duration]);
    return (
         <div className="bg-secondary w-full min-h-[350px] rounded-md relative">
            <span className="absolute left-1/2 sm:top-24 text-5xl -translate-x-1/2 text-primary top-2">{value.toFixed(2)}x</span>
            <LineGraph duration={duration} maxValue={multiplier} />

         </div>
    )
}