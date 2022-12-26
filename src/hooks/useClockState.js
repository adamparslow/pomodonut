import { useState } from "react";

export const ClockState = {
   NONE: "None",
   WORK: "Work",
   BREAK: "Break"
}

const useClockState = () => {
   const [clockState, setClockState] = useState(ClockState.NONE);

   const start = () => {
      if (clockState === ClockState.NONE)
         setClockState(ClockState.WORK);
   };

   const transition = () => {
      if (clockState === ClockState.WORK) {
         setClockState(ClockState.BREAK);
      } else if (clockState === ClockState.BREAK) {
         setClockState(ClockState.WORK);
      }
   };

   const end = () => {
      setClockState(ClockState.NONE);
   };

   return { clockState, start, transition, end };
};

export default useClockState;
