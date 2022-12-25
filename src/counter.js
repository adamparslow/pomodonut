const WORK = "WORK";
const BREAK = "BREAK";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 30 * 60;

export const getRemainingTimeAndType = (currentTime, delayedStart) => {
   const minutes = currentTime.getMinutes() % 30;
   const seconds = currentTime.getSeconds();

   const time = minutes * 60 + seconds;
   let type = WORK;

   let remainingTime = 0;

   if (time >= WORK_LIMIT) {
      type = BREAK;
      remainingTime = BREAK_LIMIT - time;
   } else {
      remainingTime = WORK_LIMIT - time;
   }

   if (delayedStart) {
      remainingTime += 30 * 60;
      type = WORK;
   }

   return {
      time: remainingTime,
      type: type
   };
}