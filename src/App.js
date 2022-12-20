import './App.css';
import { useState, useEffect } from 'react';
import TimerWheel from './TimerWheel';
import NumberInput from './NumberInput';
import useTimePeriods from './hooks/useTimePeriods';
import useIsMuted from './hooks/useIsMuted';
import useTime from './hooks/useTime';
import { alert } from './playSound';
import styled from 'styled-components';
import Button from './Button';
import { IoVolumeMute, IoVolumeHigh, IoReloadCircleOutline } from 'react-icons/io5';
import { RxReload } from 'react-icons/rx';

const BREAK = "Break";
const WORK = "Work";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 5 * 60;

const colours = {
  "Work": {
    // center: "#ff0000",
    center: '#FFFFFF',
    timer: "#ff7400",
    background: "#ffc100"
  },
  "Break": {
    // center: "#1E5631",
    center: '#FFFFFF',
    timer: "#A4DE02",
    background: "#76BA1B"
  }
}

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width:90%;
  height:90%;
  border-radius: 50%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TypeTitle = styled.h1`
  font-size: 3em;
  margin:0;
`;

const TimerTitle = styled.h1`
  font-family: monospace;
  font-size: 5em;
  margin:0;
  margin-bottom: 10px;
`;

const ButtonTray = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
`;

function App() {
  const [type, setType] = useState("Work");

  const { time, timeText } = useTime(setType);
  const { isMuted, toggleMute } = useIsMuted();
  const { timePeriods, incrementTimePeriods, decrementTimePeriods, resetTimePeriods, timeToEnd } = useTimePeriods();


  const percentage = type === WORK ?
    1 - time / WORK_LIMIT :
    1 - time / BREAK_LIMIT
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
    alert();
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
    <Background style={{ backgroundColor: backgroundColour() }}>
      <TimerWheel percentage={percentage} wheelColour={timerColour()} backgroundColour={backgroundColour()}>
        <Inner style={{ backgroundColor: centerColour() }}>
          <TypeTitle>{type}</TypeTitle>
          <TimerTitle>{timeText}</TimerTitle>
          <NumberInput value={timePeriods} increment={incrementTimePeriods} decrement={decrementTimePeriods}></NumberInput>
          <p>End time: {timePeriods > 0 ? timeToEnd : "00:00"}</p>
          <ButtonTray>
            <Button onClick={resetTimePeriods}><RxReload /></Button>
            <Button onClick={toggleMute}>
              {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
            </Button>
          </ButtonTray>
        </Inner>
      </TimerWheel>
    </Background>
  );
}



export default App;
