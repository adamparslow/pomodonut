import { renderHook, act } from '@testing-library/react'
import useCountdownAlarm from './useCountdownAlarm';

beforeEach(() => {
   jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-02-02 12:00'));
});

it('has the correct interface', () => {
   const { result } = renderHook(() => useCountdownAlarm(jest.fn()));

   expect(result.current.timeLeft).not.toBeUndefined();
   expect(result.current.setAlarm).not.toBeUndefined();
   expect(result.current.percentage).not.toBeUndefined();
});

it.each([
   ['2022-02-02 12:00', '0:00'],
   ['2022-02-02 12:14:11', '14:11'],
])('sets end time correctly', (time, expectedTimeLeft) => {
   const { result } = renderHook(() => useCountdownAlarm(jest.fn()));

   act(() => {
      result.current.setAlarm(new Date(time));
   });

   expect(result.current.timeLeft).toBe(expectedTimeLeft);
});

it.each([
   [0, "3:10"],
   [1.1, "3:09"],
   [10, "3:00"],
   [11, "2:59"],
   [60, "2:10"],
   [100.6, "1:30"],
   [190, "0:00"],
   [191, "0:00"],
   [200, "0:00"],
])('timer goes down by %i', (secondsDown, expectedTimeLeft) => {
   const { result } = renderHook(() => useCountdownAlarm(jest.fn()));

   act(() => {
      result.current.setAlarm(new Date('2022-02-02 12:03:10'));
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
])('percentage goes down by %i', (secondsDown, expectedPercentage) => {
   const { result } = renderHook(() => useCountdownAlarm(jest.fn()));

   act(() => {
      result.current.setAlarm(new Date('2022-02-02 12:01:40'));
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
      const { result } = renderHook(() => useCountdownAlarm(callbacks));

      act(() => {
         result.current.setAlarm(new Date('2022-02-02 12:01'));
      });

      callbacks.map(callback => expect(callback).not.toHaveBeenCalled());
   });

   it('runs callback when timer runs out', () => {
      const callbacks = setupCallbacks();
      const { result } = renderHook(() => useCountdownAlarm(callbacks));

      act(() => {
         result.current.setAlarm(new Date('2022-02-02 12:01'));
         jest.advanceTimersByTime(1000);
      });

      callbacks.map(callback => expect(callback).toHaveBeenCalled());
   });

   it('doesn\'t repeat callback', () => {
      const callbacks = setupCallbacks();
      const { result } = renderHook(() => useCountdownAlarm(callbacks));

      act(() => {
         result.current.setAlarm(new Date('2022-02-02 12:01'));
         jest.advanceTimersByTime(3000);
      });

      callbacks.map(callback => expect(callback).toHaveBeenCalledTimes(1));
   });
});