import React, { useState } from "react";

interface Props {
  value: number;
  onChange?: (newValue: number) => void;
  label: string;
  max: number;
  min: number;
  className?: string;
  step?: number;
  varient: "float" | "int";
}

const NumberInput: React.FC<Props> = ({
  value,
  onChange,
  className,
  label,
  max,
  min,
  step=1,
  varient
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleClick = (delta: number) => {
    const newValue: number = Math.min(Math.max(min, currentValue + delta),max);
    setCurrentValue(newValue);
    handleChange(newValue+"");
  };

  const handleChange = (val: string)=>{
    let newValue = (varient == "int"? parseInt(val) : parseFloat(val));
    newValue = Math.min(Math.max(min,newValue));
    if(!onChange) return;
    onChange?.(newValue);
  }

  return (
    <div className={`flex flex-col py-1 bg-secondary-200 rounded-md ${className}`}>
      <label className="block mb-1 text-xs font-medium text-white text-center">
        {label}
      </label>
      <div className="relative flex items-center justify-center gap-1 w-full">
        <button
          type="button"
          onClick={() => handleClick(step)}
          className="hover:opacity-90 border border-secondary rounded-lg p-1 h-7 focus:ring-primary focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-5 h-5 text-white fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <rect width="16" height="16" id="icon-bound" fill="none" />
            <polygon points="8,5 13,10 3,10" />
          </svg>
        </button>
        <input
          type="number"
          value={currentValue}
          onChange={(e)=>{handleChange(e.target.value)}}
          className="bg-black rounded-md h-7 text-center text-white text-lg focus:ring-primary  w-1/2 py-2.5"
        />
        <button
          type="button"
          onClick={() => handleClick(-1 * step)}
          className="hover:opacity-90 border border-secondary rounded-lg p-1 h-7 focus:ring-primary focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-5 h-5 text-white rotate-180 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <rect width="16" height="16" id="icon-bound" fill="none" />
            <polygon points="8,5 13,10 3,10" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
