import "./App.css";
import { useEffect, useRef } from "react";
import TimerWheel from "./TimerWheel";
import NumberInput from "./NumberInput";
import useTimePeriods from "./hooks/useTimePeriods";
import useIsMuted from "./hooks/useIsMuted";
import useCountdownAlarm from "./hooks/useCountdownAlarm";
import styled from "styled-components";
import Button, { Pill } from "./Button";
import { FaUndoAlt, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import useMode, { Mode } from "./hooks/useMode";
import useClockState, { ClockState } from "./hooks/useClockState";

const colours = {
   Work: {
      primary: "#ff7150",
      background: "#ffaa4d",
   },
   Break: {
      primary: "#54b574",
      background: "#95d8c2",
   },
   None: {
      primary: "#ff7150",
      background: "#ffaa4d",
   },
};

const Background = styled.div`
   height: 100vh;
   width: 100vw;

   display: flex;
   justify-content: space-between;
   align-items: center;

   @media only screen and (max-width: 700px) {
      flex-direction: column-reverse;
   }
`;

const Inner = styled.div`
   width: 90%;
   height: 90%;
   border-radius: 50%;
   background-color: white;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 40px;
`;

const TypeTitle = styled.h1`
   font-size: 3em;
   margin: 0;
   height: 50px;
`;

const TimerTitle = styled.h1`
   font-size: 5em;
   margin: 0;
   color: ${(props) => props.colour};
`;

const ButtonTray = styled.div`
   display: flex;
   gap: 40px;
   margin: 30px;

   @media only screen and (min-width: 701px) {
      align-self: flex-end;
      width: 250px;
   }
`;

const EndTime = styled.p`
   font-size: 1.5em;
   text-align: center;
   margin: 30px;

   @media only screen and (min-width: 701px) {
      align-self: flex-end;
      width: 250px;
   }
`;

function App() {
   const endOfAlarm = () => {
      clockState.transition();

      if (isRunning()) {
         playAlert();
      }
   };

   const startClock = () => {
      clockState.start();
   };

   const stopClock = () => {
      stopAlarm();
      clockState.end();
   };

   const { timePeriods, increment, decrement, reset, isRunning } =
      useTimePeriods();
   const { timeToEnd, endOfWork, endOfBreak, mode, rotateMode } = useMode();
   const { timeLeft, setAlarm, stopAlarm, percentage } = useCountdownAlarm([
      endOfAlarm,
   ]);
   const { isMuted, toggleMute, playAlert } = useIsMuted();

   const clockState = useClockState();
   const prevClockState = useRef();
   const wasRunning = useRef();

   document.title = timeLeft;

   useEffect(() => {
      console.log(clockState.clockState);
      if (
         clockState.clockState === ClockState.WORK &&
         prevClockState.current === ClockState.BREAK
      ) {
         decrement();
      }

      if (clockState.clockState !== ClockState.NONE) {
         const end =
            clockState.clockState === ClockState.WORK
               ? endOfWork()
               : endOfBreak();
         console.log(end);
         setAlarm(end);
      }
      prevClockState.current = clockState.clockState;
   }, [clockState.clockState]);

   useEffect(() => {
      if (mode !== Mode.NORMAL) {
         startClock();
      } else {
         stopClock();
      }
   }, [mode]);

   useEffect(() => {
      if (mode === Mode.NORMAL) {
         if (isRunning() && !wasRunning.current) {
            startClock();
            wasRunning.current = true;
         } else if (!isRunning()) {
            stopClock();
            wasRunning.current = false;
         }
      }
      console.log("Time period changed");
   }, [timePeriods]);

   const background = colours[clockState.clockState].background;
   const primary = colours[clockState.clockState].primary;

   return (
      <Background style={{ backgroundColor: background }}>
         <ButtonTray>
            <Button colour={primary} onClick={reset}>
               <FaUndoAlt />
            </Button>
            <Button colour={primary} onClick={toggleMute}>
               {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </Button>
            <Pill colour={primary} onClick={rotateMode} disabled={isRunning()}>
               {mode}
            </Pill>
         </ButtonTray>
         <TimerWheel
            percentage={isRunning() ? percentage : 0}
            wheelColour={primary}
            backgroundColour={background}
         >
            <Inner>
               <TypeTitle>
                  {isRunning() ? clockState.clockState : "Set value to start"}
               </TypeTitle>
               <TimerTitle
                  colour={primary}
                  style={{ opacity: isRunning() ? "100%" : "50%" }}
               >
                  {mode === Mode.NORMAL && !isRunning() ? "25:00" : timeLeft}
               </TimerTitle>
               <NumberInput
                  colour={primary}
                  value={timePeriods}
                  increment={increment}
                  decrement={decrement}
               ></NumberInput>
            </Inner>
         </TimerWheel>
         <EndTime>
            End time:{" "}
            <span style={{ color: "white" }}>
               {isRunning() ? timeToEnd(timePeriods) : "0:00"}
            </span>
         </EndTime>
      </Background>
   );
}

export default App;
