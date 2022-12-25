import { renderHook, act } from '@testing-library/react'
import useIsMuted from './useIsMuted';
import * as alert from '../alert';

it('has the right interface', () => {
   const { result } = renderHook(() => useIsMuted());

   expect(result.current.isMuted).not.toBeUndefined();
   expect(result.current.toggleMute).not.toBeUndefined();
   expect(result.current.playAlert).not.toBeUndefined();
});

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

describe('.playAlert', () => {
   const alertMock = {
      play: jest.fn()
   }

   it('plays when unmuted', () => {
      alert.getAlert = () => alertMock;
      const { result } = renderHook(() => useIsMuted());

      act(() => result.current.playAlert());

      expect(alertMock.play).toHaveBeenCalled();
   });

   it('doesn\'t play when muted', () => {
      alert.getAlert = () => alertMock;
      const { result } = renderHook(() => useIsMuted());

      act(() => result.current.toggleMute());
      act(() => result.current.playAlert());

      expect(alertMock.play).not.toHaveBeenCalled();
   });
});