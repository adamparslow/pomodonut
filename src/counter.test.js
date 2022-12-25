import { getRemainingTimeAndType } from "./counter";

describe('getRemainingTime', () => {
   it('returns data in the right structure', () => {
      const timeAndType = getRemainingTimeAndType(new Date());

      expect(timeAndType).toHaveProperty('time');
      expect(timeAndType).toHaveProperty('type');
   });

   it('returns correct time with work type', () => {
      const date = new Date();
      date.setMinutes(0);
      date.setSeconds(0);

      const { time, type } = getRemainingTimeAndType(date, false);

      const expectedTime = getExpectedRemainingTime(25, 0);
      expect(time).toBe(expectedTime);
      expect(type).toBe("WORK");
   });

   test.each([
      [0, 0, 25, 0],
      [14, 11, 10, 49],
      [24, 59, 0, 1],
      [30, 0, 25, 0],
      [44, 11, 10, 49],
      [54, 59, 0, 1]
   ])('WORK - time %i:%i', (minutes, seconds, expectedMinutes, expectedSeconds) => {
      const date = new Date();
      date.setMinutes(minutes);
      date.setSeconds(seconds);

      const { time, type } = getRemainingTimeAndType(date, false);

      const expectedTime = getExpectedRemainingTime(expectedMinutes, expectedSeconds);
      expect(time).toBe(expectedTime);
      expect(type).toBe("WORK");
   });

   test.each([
      [25, 0, 5, 0],
      [27, 31, 2, 29],
      [29, 59, 0, 1],
      [55, 0, 5, 0],
      [57, 31, 2, 29],
      [59, 59, 0, 1]
   ])('BREAK - time %i:%i', (minutes, seconds, expectedMinutes, expectedSeconds) => {
      const date = new Date();
      date.setMinutes(minutes);
      date.setSeconds(seconds);

      const { time, type } = getRemainingTimeAndType(date, false);

      const expectedTime = getExpectedRemainingTime(expectedMinutes, expectedSeconds);
      expect(time).toBe(expectedTime);
      expect(type).toBe("BREAK");
   });

   test.each([
      [0, 0, 55, 0],
      [14, 11, 40, 49],
      [24, 59, 30, 1],
      [30, 0, 55, 0],
      [44, 11, 40, 49],
      [54, 59, 30, 1],
      [25, 0, 35, 0],
      [27, 31, 32, 29],
      [29, 59, 30, 1],
      [55, 0, 35, 0],
      [57, 31, 32, 29],
      [59, 59, 30, 1]
   ])('Delayed start - time %i:%i', (minutes, seconds, expectedMinutes, expectedSeconds) => {
      const date = new Date();
      date.setMinutes(minutes);
      date.setSeconds(seconds);

      const { time, type } = getRemainingTimeAndType(date, true);

      const expectedTime = getExpectedRemainingTime(expectedMinutes, expectedSeconds);
      expect(time).toBe(expectedTime);
      expect(type).toBe("WORK");
   });

   /**
    * - Test that it gives the right countdown when in work time
    *    - Between 00 and 25, and 30 to 55
    * - Test that it gives the right coutndown when in break time
    *    - Between 25 and 30, and 55 to 00 
    */
});

function getExpectedRemainingTime(minutes, seconds) {
   return minutes * 60 + seconds;
}
