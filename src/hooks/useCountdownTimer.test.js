import { renderHook, act } from '@testing-library/react'
import useCountdownTimer from './useCountdownTimer';

jest.useFakeTimers();

it('has the correct interface', () => {
   const callback = jest.fn();
   const { result } = renderHook(() => useCountdownTimer(callback));

   expect(result.current.timeLeft).not.toBeUndefined();
   expect(result.current.setTimer).not.toBeUndefined();
});

it.each([
   [0, 0, "0:00"],
   [14, 11, "14:11"],
])('sets end time correctly - time %i:%i', (
   minutes,
   seconds,
   expectedTimeLeft
) => {
   const callback = jest.fn();
   const { result } = renderHook(() => useCountdownTimer(callback));

   act(() => {
      result.current.setTimer(minutes, seconds);
   });

   expect(result.current.timeLeft).toBe(expectedTimeLeft);
});

it.each([
   [1, "3:09"],
   [10, "3:00"],
   [11, "2:59"],
   [60, "2:10"],
   [100, "1:30"],
   [190, "0:00"],
   [191, "0:00"],
   [200, "0:00"],
])('timer goes down by %i', (secondsDown, expectedTimeLeft) => {
   const callback = jest.fn();
   const { result } = renderHook(() => useCountdownTimer(callback));

   act(() => {
      result.current.setTimer(3, 10);
      jest.advanceTimersByTime(secondsDown * 1000);
   });

   expect(result.current.timeLeft).toBe(expectedTimeLeft);
});

describe.each([1, 2, 3])('callbacks with length %i', (noOfCallbacks) => {
   const setupCallbacks = () => {
      const callbacks = [];
      for (let i = 0; i < noOfCallbacks; i++) {
         const callback = jest.fn();
         callbacks.push(callback);
      }
      return callbacks;
   };

   it('callback doesn\'t run whilst the timer is still going', () => {
      const callbacks = setupCallbacks();
      const { result } = renderHook(() => useCountdownTimer(callbacks));

      act(() => {
         result.current.setTimer(0, 1);
      });

      callbacks.map(callback => expect(callback).not.toHaveBeenCalled());
   });

   it('runs callback when timer runs out', () => {
      const callbacks = setupCallbacks();
      const { result } = renderHook(() => useCountdownTimer(callbacks));

      act(() => {
         result.current.setTimer(0, 1);
         jest.advanceTimersByTime(1000);
      });

      callbacks.map(callback => expect(callback).toHaveBeenCalled());
   });

   it('doesn\'t repeat callback', () => {
      const callbacks = setupCallbacks();
      const { result } = renderHook(() => useCountdownTimer(callbacks));

      act(() => {
         result.current.setTimer(0, 1);
         jest.advanceTimersByTime(3000);
      });

      callbacks.map(callback => expect(callback).toHaveBeenCalledTimes(1));
   });
});