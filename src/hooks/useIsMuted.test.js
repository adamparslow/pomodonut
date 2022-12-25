import { renderHook, act } from '@testing-library/react'
import useIsMuted from './useIsMuted';

it('starts unmuted', () => {
   const { result } = renderHook(() => useIsMuted());

   expect(result.current.isMuted).toBeFalsy();
});

describe('.toggle', () => {
   it("mutes when unmuted", () => {
      const { result } = renderHook(() => useIsMuted());

      act(() => result.current.toggleMute());

      expect(result.current.isMuted).toBeTruthy();
   });

   it('unmutes when muted', () => {
      const { result } = renderHook(() => useIsMuted());

      act(() => result.current.toggleMute());
      act(() => result.current.toggleMute());

      expect(result.current.isMuted).toBeFalsy();
   });
});