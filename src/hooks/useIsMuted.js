import { useState } from "react";

const useIsMuted = () => {
   const [isMuted, setIsMuted] = useState(false);

   const toggleMute = () => {
      setIsMuted(!isMuted);
   }

   return { isMuted, toggleMute }
};

export default useIsMuted;