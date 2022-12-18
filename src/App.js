import './App.css';
import { useState, useEffect } from 'react';
import TimerWheel from './TimerWheel';
import NumberInput from './NumberInput';

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

/**
 * TODO: 
 * - Start button
 * - Have timer stop when time runs out
 */

function App() {
  const [time, setTime] = useState(Date.now());
  const [percentage, setPercentage] = useState(0);
  const [type, setType] = useState("Work");
  const [timePeriods, setTimePeriods] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => countdownTimer(setTime, setType, setPercentage), 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    link.href = type === WORK ? "orangeCircle.png" : "greenCircle.png";
    console.log("it switched");
    if (type === WORK) {
      decrementTimePeriods();
    }
    playSound(isMuted);
  }, [type]);

  const incrementTimePeriods = () => {
    setTimePeriods(parseInt(timePeriods) + 1);
  }

  const decrementTimePeriods = () => {
    const newVal = timePeriods > 0 ? timePeriods - 1 : 0;
    setTimePeriods(newVal);
  }

  const resetTimePeriods = () => {
    setTimePeriods(0);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }

  return (
    <div className='background' style={{ backgroundColor: backgroundColour() }}>
      <TimerWheel percentage={percentage} wheelColour={timerColour()} backgroundColour={backgroundColour()}>
        <div className="inner" style={{ backgroundColor: centerColour() }}>
          <h1>{time}</h1>
          {isMuted && <p>Muted</p>}
          <p>{type}</p>
          <NumberInput value={timePeriods} increment={incrementTimePeriods} decrement={decrementTimePeriods}></NumberInput>
          {timePeriods > 0 && <p>End time: {timeToEnd(timePeriods)}</p>}
          <div>
            <button onClick={resetTimePeriods}>Reset</button>
            <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
          </div>
        </div>
      </TimerWheel>
    </div>
  );
}

function timeToEnd(timePeriods) {
  const finishDate = new Date(Date.now() + 30 * timePeriods * 60 * 1000);
  let end = "am";
  let hours = finishDate.getHours();
  if (hours > 12) {
    hours -= 12;
    end = "pm";
  } else if (hours === 0) {
    hours = 12;
  }
  let minutes = finishDate.getMinutes() >= 30 ? 30 : 0;

  return `${hours}:${minutes.toString().padStart(2, '0')} ${end}`
}

function playSound(isMuted, timePeriods) {
  if (isMuted || timePeriods === 0) return;
  const audio = new Audio('alert.mp3');
  audio.volume = 1;
  audio.play();
}

function countdownTimer(setTime, setType, setPercentage) {
  const time = new Date();
  let minutes = time.getMinutes() % 30;
  const seconds = time.getSeconds();
  const timeInSeconds = minutes * 60 + seconds;
  let remainingTime;
  if (timeInSeconds < WORK_LIMIT) {
    setType(WORK);
    setPercentage(timeInSeconds / WORK_LIMIT)
    remainingTime = WORK_LIMIT - timeInSeconds;
  } else {
    setType(BREAK);
    setPercentage((timeInSeconds - WORK_LIMIT) / BREAK_LIMIT)
    remainingTime = WORK_LIMIT + BREAK_LIMIT - timeInSeconds;
  }

  const minutesText = Math.floor(remainingTime / 60).toString();
  const secondsText = (remainingTime % 60).toString().padStart(2, "0");
  const text = `${minutesText}:${secondsText}`;

  setTime(text);
  document.title = text;
}

export default App;
