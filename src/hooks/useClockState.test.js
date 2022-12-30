import { renderHook, act } from '@testing-library/react'
import useClockState, { ClockState } from './useClockState';

it('has correct interface', () => {
   const { result } = renderHook(() => useClockState());

   expect(result.current.clockState).not.toBeUndefined();
   expect(result.current.start).not.toBeUndefined();
   expect(result.current.transition).not.toBeUndefined();
   expect(result.current.end).not.toBeUndefined();
});

it('Starts with NONE clockState', () => {
   const { result } = renderHook(() => useClockState());

   expect(result.current.clockState).toBe(ClockState.NONE);
});

describe('.start', () => {
   it('moves from NONE to WORK', () => {
      const { result } = renderHook(() => useClockState());

      act(() => result.current.start());

      expect(result.current.clockState).toBe(ClockState.WORK)
   });

   it('moves from WORK to WORK', () => {
      const { result } = renderHook(() => useClockState());
      setToWork(result);

      act(() => result.current.start());

      expect(result.current.clockState).toBe(ClockState.WORK)
   });

   it('moves from BREAK to BREAK', () => {
      const { result } = renderHook(() => useClockState());
      setToBreak(result);

      act(() => result.current.start());

      expect(result.current.clockState).toBe(ClockState.BREAK)
   });
});

describe('.transition', () => {
   it('moves from WORK to BREAK', () => {
      const { result } = renderHook(() => useClockState());
      setToWork(result);

      act(() => result.current.transition());

      expect(result.current.clockState).toBe(ClockState.BREAK)
   });

   it('moves from BREAK to WORK', () => {
      const { result } = renderHook(() => useClockState());
      setToBreak(result);

      act(() => result.current.transition());

      expect(result.current.clockState).toBe(ClockState.WORK)
   });

   it('moves from NONE to NONE', () => {
      const { result } = renderHook(() => useClockState());

      act(() => result.current.transition());

      expect(result.current.clockState).toBe(ClockState.NONE)
   });
});

describe('.end', () => {
   it('moves from WORK to NONE', () => {
      const { result } = renderHook(() => useClockState());
      setToWork(result);

      act(() => result.current.end());

      expect(result.current.clockState).toBe(ClockState.NONE)
   });

   it('moves from BREAK to NONE', () => {
      const { result } = renderHook(() => useClockState());
      setToBreak(result);

      act(() => result.current.end());

      expect(result.current.clockState).toBe(ClockState.NONE)
   });

   it('moves from NONE to NONE', () => {
      const { result } = renderHook(() => useClockState());

      act(() => result.current.end());

      expect(result.current.clockState).toBe(ClockState.NONE)
   });
});

function setToWork(result) {
   act(() => result.current.start());
}

function setToBreak(result) {
   setToWork(result);
   act(() => result.current.transition());
}