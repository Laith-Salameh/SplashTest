
import { useGameStore } from "@/store/store";
import React, {FC} from "react";

  

export const MultiplierGraph: FC = ({})=>{
    const {lastRound} = useGameStore();
    const multiplier = (lastRound?.crashMultipler ?? 0).toFixed(2);
    return (
         <div className="bg-secondary w-full md:min-h-[350px] sm:h-full rounded-md relative">
         <span className="absolute left-1/2 sm:top-24 text-5xl -translate-x-1/2 text-white top-2">{multiplier}x</span>
         </div>
    )
}