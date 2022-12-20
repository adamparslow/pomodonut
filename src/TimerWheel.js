import styled from "styled-components";

const Wheel = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 90vw;
  max-height: 700px;
  border-radius: 50%;

  position: relative;

  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Gap = styled.div`
  height: 85%; 
  width: 85%;

  border-radius: 50%;

  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

   const [top, left] = calculateCirclePos(percentage, 323.9);

   return (
      <Wheel style={
         {
            background: percentage <= 0.5 ?
               `linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%),
               linear-gradient(90deg, ${wheelColour} 50%, transparent 50%)` :
               `linear-gradient(90deg, transparent 50%, ${backgroundColour} 50%),
               linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%)`
         }
      }>
         <Circle style={
            {
               backgroundColor: wheelColour,
               top: 0
            }
         }></Circle>
         <Circle style={
            {
               backgroundColor: wheelColour,
               top: top,
               left: left
            }
         }></Circle>
         <Gap style={{ backgroundColor: backgroundColour }}>
            {props.children}
         </Gap>
      </Wheel>
   );
}

function calculateCirclePos(percentage, radius) {
   const top = (-Math.cos(Math.PI * 2 * percentage) * radius) + radius;
   const left = Math.sin(Math.PI * 2 * percentage) * radius + radius;

   return [top, left]
};

export default TimerWheel;