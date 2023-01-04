import { renderHook, act } from "@testing-library/react";
import useMode, { Mode } from "./useMode";

it("has correct interface", () => {
   const { result } = renderHook(() => useMode(0));

   expect(result.current.timeToEnd).not.toBeUndefined();
   expect(result.current.endOfWork).not.toBeUndefined();
   expect(result.current.endOfBreak).not.toBeUndefined();
   expect(result.current.rotateMode).not.toBeUndefined();
   expect(result.current.mode).not.toBeUndefined();
});

it("starts with PARTIAL mode", () => {
   const { result } = renderHook(() => useMode(0));

   expect(result.current.mode).toBe(Mode.PARTIAL);
});

it("rotates correctly", () => {
   const { result } = renderHook(() => useMode(0));

   act(() => result.current.rotateMode());

   expect(result.current.mode).toBe(Mode.NORMAL);

   act(() => result.current.rotateMode());

   expect(result.current.mode).toBe(Mode.DELAYED);

   act(() => result.current.rotateMode());

   expect(result.current.mode).toBe(Mode.PARTIAL);
});

describe("timeToEnd", () => {
   beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date("2022-02-02 11:11"));
   });

   it("returns 0:00 for no time periods", () => {
      const { result } = renderHook(() => useMode(0));

      expect(result.current.timeToEnd()).toBe("0:00");
   });

   it.each([
      [1, "11:30 am"],
      [2, "12:00 pm"],
      [3, "12:30 pm"],
      [4, "1:00 pm"],
      [26, "12:00 am"],
   ])(
      "shows correct time for PARTIAL mode for %1 time period",
      (timePeriod, expectedTimeToEnd) => {
         const { result } = renderHook(() => useMode(timePeriod));

         expect(result.current.timeToEnd()).toBe(expectedTimeToEnd);
      }
   );

   it.each([
      [1, "11:41 am"],
      [2, "12:11 pm"],
      [3, "12:41 pm"],
   ])(
      "shows correct time for NORMAL mode for %1 time period",
      (timePeriod, expectedTimeToEnd) => {
         const { result } = renderHook(() => useMode(timePeriod));
         act(() => result.current.rotateMode());

         expect(result.current.timeToEnd()).toBe(expectedTimeToEnd);
      }
   );

   it.each([
      [1, "12:00 pm"],
      [2, "12:30 pm"],
      [3, "1:00 pm"],
   ])(
      "shows correct time for DELAYED mode for %1 time period",
      (timePeriod, expectedTimeToEnd) => {
         const { result } = renderHook(() => useMode(timePeriod));
         act(() => result.current.rotateMode());
         act(() => result.current.rotateMode());

         expect(result.current.timeToEnd()).toBe(expectedTimeToEnd);
      }
   );
});

describe("endOfWork", () => {
   beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date("2022-02-02 11:11"));
   });

   it("returns 11:25 for PARTIAL mode", () => {
      const { result } = renderHook(() => useMode(0));

      expect(result.current.endOfWork()).toStrictEqual(
         new Date("2022-02-02 11:25")
      );
   });

   it("returns 11:36 for NORMAL mode", () => {
      const { result } = renderHook(() => useMode(0));
      act(() => result.current.rotateMode());

      expect(result.current.endOfWork()).toStrictEqual(
         new Date("2022-02-02 11:36")
      );
   });

   it("returns 11:55 for DELAYED mode", () => {
      const { result } = renderHook(() => useMode(0));
      act(() => result.current.rotateMode());
      act(() => result.current.rotateMode());

      expect(result.current.endOfWork()).toStrictEqual(
         new Date("2022-02-02 11:55")
      );
   });
});

describe("endOfBreak", () => {
   beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date("2022-02-02 11:11"));
   });

   it("returns 11:30 for PARTIAL mode", () => {
      const { result } = renderHook(() => useMode(0));

      expect(result.current.endOfBreak()).toStrictEqual(
         new Date("2022-02-02 11:30")
      );
   });

   it("returns 11:41 for NORMAL mode", () => {
      const { result } = renderHook(() => useMode(0));
      act(() => result.current.rotateMode());

      expect(result.current.endOfBreak()).toStrictEqual(
         new Date("2022-02-02 11:41")
      );
   });

   it("returns 12:00 for DELAYED mode", () => {
      const { result } = renderHook(() => useMode(0));
      act(() => result.current.rotateMode());
      act(() => result.current.rotateMode());

      expect(result.current.endOfBreak()).toStrictEqual(
         new Date("2022-02-02 12:00")
      );
   });
});
