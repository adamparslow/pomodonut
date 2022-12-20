import styled from "styled-components";

const Wheel = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 90vw;
  max-height: 700px;
  border-radius: 50%;

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

function TimerWheel(props) {
   const percentage = props.percentage;
   const degree = (percentage * 360 + 90) % 360;

   const wheelColour = props.wheelColour;
   const backgroundColour = props.backgroundColour;

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
         <Gap style={{ backgroundColor: backgroundColour }}>
            {props.children}
         </Gap>
      </Wheel>
   );
}

export default TimerWheel;