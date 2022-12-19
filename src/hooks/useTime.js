import { useState, useEffect } from "react";

const BREAK = "Break";
const WORK = "Work";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 5 * 60;

const useTime = (setType) => {
   const [time, setTime] = useState(0);

   const countdownTimer = () => {
      const currentTime = new Date();
      let minutes = currentTime.getMinutes() % 30;
      const seconds = currentTime.getSeconds();
      const timeInSeconds = minutes * 60 + seconds;
      let remainingTime;
      if (timeInSeconds < WORK_LIMIT) {
         setType(WORK);
         remainingTime = WORK_LIMIT - timeInSeconds;
      } else {
         setType(BREAK);
         remainingTime = WORK_LIMIT + BREAK_LIMIT - timeInSeconds;
      }

      setTime(remainingTime);
   }

   useEffect(() => {
      const interval = setInterval(() => countdownTimer(), 1);
      return () => clearInterval(interval);
   }, []);

   const minutesText = Math.floor(time / 60).toString();
   const secondsText = (time % 60).toString().padStart(2, "0");

   const timeText = `${minutesText}:${secondsText}`;
   document.title = timeText;

   return { time, timeText }
};

export default useTime;