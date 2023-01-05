import { useState, useEffect } from "react";

const useCountdownAlarm = (callbacks) => {
   const [endTime, setEndTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [timeLeft, setTimeLeft] = useState("0:00");

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
      let diffMilli = endTime - Date.now();
      const milli = diffMilli % 1000;
      if (milli > 0) {
         diffMilli -= milli;
         diffMilli += 1000;
      }
      const difference = diffMilli >= 0 ? new Date(diffMilli) : new Date(0);
      const minutes = difference.getMinutes();
      const seconds = difference.getSeconds().toString().padStart(2, "0");

      setTimeLeft(`${minutes}:${seconds}`);
   };

   const setAlarm = (alarmDate) => {
      setEndTime(alarmDate.getTime());

      const newDuration = alarmDate.getTime() - Date.now();
      setDuration(newDuration);
   };

   const stopAlarm = () => {
      setEndTime(new Date());
      setDuration(0);
   };

   const calculatePercentage = () => {
      if (duration === 0) return 0;

      let remaining = endTime - Date.now();
      if (remaining < 0) remaining = 0;

      let percentage = (duration - remaining) / duration;
      if (percentage === 1) percentage = 0;

      return percentage;
   };

   useEffect(() => {
      const interval = setInterval(clockTick, 1000);
      return () => clearInterval(interval);
   }, [endTime]);

   useEffect(() => {
      updateTimeLeft();
   }, [endTime]);

   const percentage = calculatePercentage();

   return { timeLeft, setAlarm, stopAlarm, percentage };
};

export default useCountdownAlarm;
