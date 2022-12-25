import { useState, useEffect } from "react";

const useCountdownTimer = (callbacks) => {
   const [endTime, setEndTime] = useState(0);
   const [duration, setDuration] = useState(0);
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
      const newDuration = minutes * 60 * 1000 + seconds * 1000
      const milli = Date.now() + newDuration;

      setEndTime(milli);
      setDuration(newDuration);
   };

   const calculatePercentage = () => {
      let remaining = endTime - Date.now();
      if (remaining < 0) remaining = 0;

      return (duration - remaining) / duration;
   };

   useEffect(() => {
      const interval = setInterval(clockTick, 200);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      updateTimeLeft();
   }, [endTime]);

   const percentage = calculatePercentage();

   return { timeLeft, setTimer, percentage };
};

export default useCountdownTimer;