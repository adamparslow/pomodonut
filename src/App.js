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
    primary: "#ff7400",
    background: "#ffc100"
  },
  "Break": {
    primary: "#A4DE02",
    background: "#76BA1B"
  }
}

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Inner = styled.div`
  width:90%;
  height:90%;
  border-radius: 50%;
  background-color: white;
  
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
  color: ${props => props.colour};
`;

const ButtonTray = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 30px;
  width: 220px;
  margin: 30px;
`;

const EndTime = styled.p`
  align-self: flex-end;
  font-size: 1.5em;
  width: 220px;
  text-align: right;
  margin: 30px;
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
    if (isMuted || timePeriods === 0) return;
    alert();
  }

  const background = colours[type].background;
  const primary = colours[type].primary;

  return (
    <Background style={{ backgroundColor: background }}>
      <ButtonTray>
        <Button colour={primary} onClick={resetTimePeriods}><RxReload /></Button>
        <Button colour={primary} onClick={toggleMute}>
          {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
        </Button>
      </ButtonTray>
      <TimerWheel percentage={percentage} wheelColour={primary} backgroundColour={background}>
        <Inner>
          <TypeTitle>{type}</TypeTitle>
          <TimerTitle colour={primary}>{timeText}</TimerTitle>
          <NumberInput colour={primary} value={timePeriods} increment={incrementTimePeriods} decrement={decrementTimePeriods}></NumberInput>
        </Inner>
      </TimerWheel>
      <EndTime>End time: <span style={{ color: 'white' }}>{timePeriods > 0 ? timeToEnd : "00:00"}</span></EndTime>
    </Background>
  );
}



export default App;
