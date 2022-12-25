import { useState } from "react";
import { getAlert } from "../alert.js";

const useIsMuted = () => {
   const [isMuted, setIsMuted] = useState(false);

   const toggleMute = () => {
      setIsMuted(!isMuted);
   }

   const playAlert = () => {
      if (isMuted) return;

      const alert = getAlert();
      alert.volume = 1;
      alert.play();
   }

   return { isMuted, toggleMute, playAlert }
};

export default useIsMuted;