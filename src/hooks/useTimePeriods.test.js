import { renderHook, act } from "@testing-library/react";
import useTimePeriods from "./useTimePeriods";

it("has correct interface", () => {
   const { result } = renderHook(() => useTimePeriods());

   expect(result.current.timePeriods).not.toBeUndefined();
   expect(result.current.increment).not.toBeUndefined();
   expect(result.current.decrement).not.toBeUndefined();
   expect(result.current.reset).not.toBeUndefined();
   expect(result.current.isRunning).not.toBeUndefined();
});

it("starts with value 0", () => {
   const { result } = renderHook(() => useTimePeriods());

   expect(result.current.timePeriods).toBe(0);
});

describe(".increment", () => {
   it.each([
      [1, 1],
      [2, 2],
      [3, 3],
      [10, 10],
   ])("increments the value %i times", (times, value) => {
      const { result } = renderHook(() => useTimePeriods());

      for (let i = 0; i < times; i++) {
         act(() => result.current.increment());
      }

      expect(result.current.timePeriods).toBe(value);
   });
});

describe(".decrement", () => {
   it.each([
      [1, 1, 0],
      [1, 2, 1],
      [2, 5, 3],
      [10, 10, 0],
   ])("decrements the value %i times", (dec, inc, value) => {
      const { result } = renderHook(() => useTimePeriods());
      for (let i = 0; i < inc; i++) {
         act(() => result.current.increment());
      }

      for (let i = 0; i < dec; i++) {
         act(() => result.current.decrement());
      }

      expect(result.current.timePeriods).toBe(value);
   });

   it("doesn't decrement below 0", () => {
      const { result } = renderHook(() => useTimePeriods());

      act(() => result.current.decrement());
      act(() => result.current.decrement());

      expect(result.current.timePeriods).toBe(0);
   });
});

describe(".reset", () => {
   it("resets value to 0", () => {
      const { result } = renderHook(() => useTimePeriods());
      act(() => result.current.increment());

      act(() => result.current.reset());

      expect(result.current.timePeriods).toBe(0);
   });

   it("stays at 0 when reset at 0", () => {
      const { result } = renderHook(() => useTimePeriods());

      act(() => result.current.reset());

      expect(result.current.timePeriods).toBe(0);
   });
});

describe(".isRunning", () => {
   it("is false when timePeriods = 0", () => {
      const { result } = renderHook(() => useTimePeriods());

      expect(result.current.isRunning()).toBe(false);
   });

   it("is true when timePeriods > 0", () => {
      const { result } = renderHook(() => useTimePeriods());
      act(() => result.current.increment());

      expect(result.current.isRunning()).toBe(true);
   });
});
