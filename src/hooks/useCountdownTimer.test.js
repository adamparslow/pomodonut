import { renderHook, act } from '@testing-library/react'
import useCountdownTimer from './useCountdownTimer';

jest.useFakeTimers();

it('has the correct interface', () => {
   const { result } = renderHook(() => useCountdownTimer(jest.fn()));

   expect(result.current.timeLeft).not.toBeUndefined();
   expect(result.current.setTimer).not.toBeUndefined();
   expect(result.current.percentage).not.toBeUndefined();
});

it.each([
   [0, 0, "0:00"],
   [14, 11, "14:11"],
])('sets end time correctly - time %i:%i', (
   minutes,
   seconds,
   expectedTimeLeft
) => {
   const { result } = renderHook(() => useCountdownTimer(jest.fn()));

   act(() => {
      result.current.setTimer(minutes, seconds);
   });

   expect(result.current.timeLeft).toBe(expectedTimeLeft);
});

it.each([
   [0, "3:10"],
   [1, "3:09"],
   [10, "3:00"],
   [11, "2:59"],
   [60, "2:10"],
   [100, "1:30"],
   [190, "0:00"],
   [191, "0:00"],
   [200, "0:00"],
])('timer goes down by %i', (secondsDown, expectedTimeLeft) => {
   const { result } = renderHook(() => useCountdownTimer(jest.fn()));

   act(() => {
      result.current.setTimer(3, 10);
      jest.advanceTimersByTime(secondsDown * 1000);
   });

   expect(result.current.timeLeft).toBe(expectedTimeLeft);
});

it.each([
   [0, 0],
   [1, 0.01],
   [10, 0.1],
   [11, 0.11],
   [60, 0.6],
   [100, 1],
   [190, 1],
   [191, 1],
   [200, 1],
])('timer goes down by %i', (secondsDown, expectedPercentage) => {
   const { result } = renderHook(() => useCountdownTimer(jest.fn()));

   act(() => {
      result.current.setTimer(1, 40);
      jest.advanceTimersByTime(secondsDown * 1000);
   });

   expect(result.current.percentage).toBe(expectedPercentage);
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