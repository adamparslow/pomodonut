import { useState } from "react";

const useTimePeriods = () => {
   const [timePeriods, setTimePeriods] = useState(0);

   const increment = () => {
      setTimePeriods(parseInt(timePeriods) + 1);
   }

   const decrement = () => {
      const newVal = timePeriods > 0 ? timePeriods - 1 : 0;
      setTimePeriods(newVal);
   }

   const reset = () => {
      setTimePeriods(0);
   }

   const finishDate = new Date(Date.now() + 30 * timePeriods * 60 * 1000);
   let end = "am";
   let hours = finishDate.getHours();
   if (hours >= 12) {
      if (hours > 12) {
         hours -= 12;
      }
      end = "pm";
   } else if (hours === 0) {
      hours = 12;
   }
   let minutes = finishDate.getMinutes() >= 30 ? 30 : 0;

   const timeToEnd = `${hours}:${minutes.toString().padStart(2, '0')} ${end}`

   return {
      value: timePeriods,
      increment,
      decrement,
      reset
   };
};

export default useTimePeriods;