import { useState } from "react";

const useTimePeriods = () => {
   const [timePeriods, setTimePeriods] = useState(0);

   const incrementTimePeriods = () => {
      setTimePeriods(parseInt(timePeriods) + 1);
   }

   const decrementTimePeriods = () => {
      const newVal = timePeriods > 0 ? timePeriods - 1 : 0;
      setTimePeriods(newVal);
   }

   const resetTimePeriods = () => {
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

   const timeToEnd = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${end}`

   return { timePeriods, incrementTimePeriods, decrementTimePeriods, resetTimePeriods, timeToEnd };
};

export default useTimePeriods;