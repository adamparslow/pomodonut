import styled, { keyframes } from "styled-components";

const Wheel = styled.div`
   height: 90vw;
   max-height: 700px;
   aspect-ratio: 1;
   border-radius: 50%;

   position: relative;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const Gap = styled.div`
   height: 85%;
   width: 85%;

   z-index: 1;

   border-radius: 50%;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const rotationAnimation = (start, end) => keyframes`
   0%   {transform: rotate(${start}turn);}
   100%   {transform: rotate(${end}turn);}
`;

const Rotator = styled.div`
   height: 100%;
   width: 100%;
   position: absolute;
   border-radius: 50%;

   display: flex;
   justify-content: center;

   animation-duration: 1s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;

   animation: ${(props) =>
         rotationAnimation(props.turn - 1 / (25 * 60), props.turn)}
      1s linear infinite;
`;

const Circle = styled.div`
   background-color: green;
   width: 7.5%;
   height: 7.5%;

   border-radius: 50%;

   position: absolute;
`;

function TimerWheel(props) {
   const percentage = props.percentage;
   const degree = (percentage * 360 + 90) % 360;

   const wheelColour = props.wheelColour;
   const backgroundColour = props.backgroundColour;

   return (
      <Wheel
         style={{
            background:
               percentage <= 0.5
                  ? `linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%),
               linear-gradient(90deg, ${wheelColour} 50%, transparent 50%)`
                  : `linear-gradient(90deg, transparent 50%, ${backgroundColour} 50%),
               linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%)`,
         }}
      >
         <Rotator turn={percentage}>
            <Circle
               style={{
                  backgroundColor: wheelColour,
               }}
            ></Circle>
         </Rotator>
         <Gap style={{ backgroundColor: backgroundColour }}>
            {props.children}
         </Gap>
         <Circle
            style={{
               backgroundColor: wheelColour,
               top: 0,
            }}
         ></Circle>
      </Wheel>
   );
}

export default TimerWheel;
