import { useState, useEffect } from "react";

const useCountdownTimer = (callbacks) => {
   const [endTime, setEndTime] = useState(0);
   const [timeLeft, setTimeLeft] = useState("00:00");

   const callbackQueue = callbacks;

   const clockTick = () => {
      updateTimeLeft();

      const diffMilli = endTime - Date.now();
      if (diffMilli <= 0) {
         while (callbackQueue.length > 0) {
            const callback = callbackQueue.shift();
            callback();
         }
      }
   };

   const updateTimeLeft = () => {
      const diffMilli = endTime - Date.now();
      const difference = diffMilli >= 0 ? new Date(endTime - Date.now()) : new Date(0);
      const minutes = difference.getMinutes();
      const seconds = difference.getSeconds().toString().padStart(2, '0');

      setTimeLeft(`${minutes}:${seconds}`);
   }

   const setTimer = (minutes, seconds) => {
      const milli = Date.now() + minutes * 60 * 1000 + seconds * 1000;
      setEndTime(milli);
   };

   useEffect(() => {
      const interval = setInterval(clockTick, 200);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      updateTimeLeft();
   }, [endTime]);

   return { timeLeft, setTimer };
};

export default useCountdownTimer;