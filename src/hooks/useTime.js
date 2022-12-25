import { useState, useEffect } from "react";
import { getRemainingTimeAndType } from "../counter";

const BREAK = "BREAK";
const WORK = "WORK";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 5 * 60;

const useTime = () => {
   const [time, setTime] = useState(0);
   const [type, setType] = useState(WORK);
   const [isFirstDelayed, setIsFirstDelayed] = useState(false);

   const countdownTimer = () => {
      const { time, type } = getRemainingTimeAndType(new Date(), false);

      setTime(time);
      setType(type);
   }

   const setDelayedStart = () => {
      setIsFirstDelayed(true);
   };

   useEffect(() => {
      const interval = setInterval(countdownTimer, 1);
      return () => clearInterval(interval);
   }, []);

   const link = document.querySelector("link[rel~='icon']");
   link.href = type === WORK ? "orangeCircle.png" : "greenCircle.png";


   const minutesText = Math.floor(time / 60).toString();
   const secondsText = (time % 60).toString().padStart(2, "0");

   const timeText = `${minutesText}:${secondsText}`;
   document.title = timeText;

   const percentage = type === WORK ?
      1 - time / WORK_LIMIT :
      1 - time / BREAK_LIMIT;

   return { timeText, type, percentage, setDelayedStart, isFirstDelayed }
};

export default useTime;