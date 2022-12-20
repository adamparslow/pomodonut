import './App.css';
import { useState, useEffect } from 'react';
import TimerWheel from './TimerWheel';
import NumberInput from './NumberInput';
import useTimePeriods from './hooks/useTimePeriods';
import useIsMuted from './hooks/useIsMuted';
import useTime from './hooks/useTime';

const BREAK = "Break";
const WORK = "Work";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 5 * 60;

const colours = {
  "Work": {
    center: "#ff0000",
    timer: "#ff7400",
    background: "#ffc100"
  },
  "Break": {
    center: "#1E5631",
    timer: "#A4DE02",
    background: "#76BA1B"
  }
}

function App() {
  const [type, setType] = useState("Work");

  const { time, timeText } = useTime(setType);
  const { isMuted, toggleMute } = useIsMuted();
  const { timePeriods, incrementTimePeriods, decrementTimePeriods, resetTimePeriods, timeToEnd } = useTimePeriods();


  const percentage = type === WORK ?
    1 - time / WORK_LIMIT :
    1 - time / BREAK_LIMIT;
  const link = document.querySelector("link[rel~='icon']");
  link.href = type === WORK ? "orangeCircle.png" : "greenCircle.png";

  useEffect(() => {
    if (type === WORK) {
      decrementTimePeriods();
    }

    playSound();
  }, [type]);

  const playSound = () => {
    console.log(isMuted);
    console.log(timePeriods);
    console.log(isMuted || timePeriods === 0);
    if (isMuted || timePeriods === 0) return;
    const audio = new Audio(process.env.PUBLIC_URL + '/alert.mp3');
    audio.volume = 1;
    audio.play();
  }

  const backgroundColour = () => {
    return colours[type].background;
  };

  const timerColour = () => {
    return colours[type].timer;
  }

  const centerColour = () => {
    return colours[type].center;
  }

  return (
    <div className='background' style={{ backgroundColor: backgroundColour() }}>
      <TimerWheel percentage={percentage} wheelColour={timerColour()} backgroundColour={backgroundColour()}>
        <div className="inner" style={{ backgroundColor: centerColour() }}>
          <h1>{timeText}</h1>
          {isMuted && <p>Muted</p>}
          <p>{type}</p>
          <NumberInput value={timePeriods} increment={incrementTimePeriods} decrement={decrementTimePeriods}></NumberInput>
          {timePeriods > 0 && <p>End time: {timeToEnd}</p>}
          <div>
            <button onClick={resetTimePeriods}>Reset</button>
            <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
          </div>
          <button onClick={playSound}>PlaySound</button>
        </div>
      </TimerWheel>
    </div>
  );
}



export default App;
