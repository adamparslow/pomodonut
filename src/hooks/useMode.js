import { useState } from "react";

export const Mode = {
   NORMAL: "Normal",
   DELAYED: "Delayed",
   PARTIAL: "Partial",
};

const WORK_TIME_LENGTH = 25;
const FULL_TIME_LENGTH = 30;

const useMode = () => {
   const [mode, setMode] = useState(Mode.PARTIAL);

   const rotateMode = () => {
      if (mode === Mode.PARTIAL) {
         setMode(Mode.NORMAL);
      } else if (mode === Mode.NORMAL) {
         setMode(Mode.DELAYED);
      } else {
         setMode(Mode.PARTIAL);
      }
   };

   const timeToEnd = (timePeriods) => {
      if (timePeriods === 0) {
         return "0:00";
      }

      const endTime = endOfTimeBlocks(FULL_TIME_LENGTH, timePeriods);

      return endTime
         .toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
         })
         .toLowerCase();
   };

   const endOfWork = () => endOfTimeBlocks(WORK_TIME_LENGTH, 1);
   const endOfBreak = () => endOfTimeBlocks(FULL_TIME_LENGTH, 1);

   const endOfTimeBlocks = (length, amount) => {
      const now = new Date();
      const minutes = now.getMinutes() % 30;
      const seconds = now.getSeconds();
      const timeToRemove =
         mode !== Mode.NORMAL ? minutes * 60 * 1000 + seconds * 1000 : 0;

      const timeToAdd = mode === Mode.DELAYED ? 30 * 60 * 1000 : 0;

      const endTime = new Date(
         now.getTime() - timeToRemove + amount * length * 60 * 1000 + timeToAdd
      );

      return endTime;
   };

   return { timeToEnd, endOfWork, endOfBreak, mode, rotateMode };
};

export default useMode;
