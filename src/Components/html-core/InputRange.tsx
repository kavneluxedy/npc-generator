import React, { JSX, SetStateAction } from "react";

type InputRangeProps = {
   id: string;
   min: number;
   max: number;
   setMin: React.Dispatch<SetStateAction<number>>
   setMax: React.Dispatch<SetStateAction<number>>
   step?: number;
};

const InputRange = ({ id, min, max, setMin, setMax, step = 20 }: InputRangeProps): JSX.Element => {
   const absoluteMin = 1;
   const absoluteMax = 1000;

   const resetRange = () => {
      setMin(absoluteMin);
      setMax(absoluteMax);
   }

   return (
      <div id="" className="custom-age-parameters">
         <label htmlFor={`min-${id}`}>Min age</label>&nbsp;<b>{min}</b>
         <input
            type="range"
            id={`min-${id}`}
            name={`min-${id}`}
            min={absoluteMin}
            max={max - step}
            value={min}
            step={step}
            onChange={(e) => {
               const newVal = parseInt(e.target.value, 10);
               if (newVal < max) {
                  setMin(newVal);
               }
            }}
         />

         <label htmlFor={`max-${id}`}>Max age</label>&nbsp;<b>{max}</b>
         <input
            type="range"
            id={`max-${id}`}
            name={`max-${id}`}
            min={min + step}
            max={absoluteMax}
            value={max}
            step={step}
            onChange={(e) => {
               const newVal = parseInt(e.target.value, 10);
               setMax(newVal);
            }}
         />

         <input
            type="range"
            id={`step-${id}`}
            name={`step-${id}`}
            min={1}
            max={100}
            value={step}
            onChange={(e) => {
               const newStep = parseInt(e.target.value, 10);
               if (newStep && !isNaN(newStep)) {
                  step = newStep;
               }
            }}
         />

         <label htmlFor={`step-${id}`}>Step: {step} (Fonctionnalité en cours de dév)</label>

         <input type="button" onClick={() => resetRange()} placeholder={"Reset"} value={"Reset"} />

      </div>
   );
}

export default InputRange