function TimerWheel(props) {
   const percentage = props.percentage;
   const degree = (percentage * 360 + 90) % 360;

   const wheelColour = props.wheelColour;
   const backgroundColour = props.backgroundColour;

   return (
      <div className="container" style={
         {
            background: percentage <= 0.5 ?
               `linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%),
               linear-gradient(90deg, ${wheelColour} 50%, transparent 50%)` :
               `linear-gradient(90deg, transparent 50%, ${backgroundColour} 50%),
               linear-gradient(${degree}deg, transparent 50%, ${wheelColour} 50%)`
         }
      }>
         {props.children}
      </div >
   );
}

export default TimerWheel;