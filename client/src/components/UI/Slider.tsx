import React, { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
  labels?: string[];
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  onChange,
  labels = Array.from({ length: max - min + 1}, (_, i) => ((min + i) + "x"))
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange?.(newValue);
  };

  const percentage = (((value - min) / (max - min)) * 100);
  const invPercentage = 100 - percentage;


  return (
    <div className="pt-2 pb-1 px-2 rounded-md bg-secondary-200">
      <input
        type="range"
        className="w-full rounded-md mb-1 bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
        [&::-webkit-slider-thumb]:w-2.5
        [&::-webkit-slider-thumb]:h-2.5
        [&::-webkit-slider-thumb]:-mt-0.5
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:bg-primary
        [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(196,33,117,0.9)]
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:transition-all
        [&::-webkit-slider-thumb]:duration-150
        [&::-webkit-slider-thumb]:ease-in-out
        [&::-webkit-slider-thumb]:dark:bg-neutral-700

        [&::-moz-range-thumb]:w-2.5
        [&::-moz-range-thumb]:h-2.5
        [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:bg-primary
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-blue-600
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:transition-all
        [&::-moz-range-thumb]:duration-150
        [&::-moz-range-thumb]:ease-in-out

        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:bg-transparent
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:bg-primary
        [&::-moz-range-track]:rounded-full
        "
        min={min.toString()}
        max={max.toString()}
        step="1"
        value={value.toString()}
        onChange={handleChange}
        style={{
            background: percentage > invPercentage?  
            `linear-gradient(to right,  #c42175 ${percentage.toFixed(2)}%, #1B1A55 ${invPercentage.toFixed(2)}%)`: 
            `linear-gradient(to left,  #1B1A55 ${invPercentage.toFixed(2)}%, #c42175 ${percentage.toFixed(2)}%)`,
          }}
      />
      <div className="w-full flex justify-between mt-1">
        {labels.map((label,i) => (
          <span key={i} className="w-5 h-4 text-white text-xs">
            {`${label}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
