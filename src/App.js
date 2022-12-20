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
import { FaUndoAlt, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const BREAK = "BREAK";
const WORK = "WORK";

const WORK_LIMIT = 25 * 60;
const BREAK_LIMIT = 5 * 60;

const colours = {
  "WORK": {
    primary: "#ff7150",
    background: "#ffaa4d"
  },
  "BREAK": {
    primary: "#54b574",
    background: "#95d8c2"
  }
}

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
  width:90%;
  height:90%;
  border-radius: 50%;
  background-color: white;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:40px;
`;

const TypeTitle = styled.h1`
  font-size: 3em;
  margin:0;
  height: 50px;
`;

const TimerTitle = styled.h1`
  font-size: 5em;
  margin:0;
  color: ${props => props.colour};
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
  const [type, setType] = useState(WORK);

  const { time, timeText } = useTime(setType);
  const { isMuted, toggleMute } = useIsMuted();
  const { timePeriods, incrementTimePeriods, decrementTimePeriods, resetTimePeriods, timeToEnd } = useTimePeriods();


  const percentage = timePeriods > 0 ? type === WORK ?
    1 - time / WORK_LIMIT :
    1 - time / BREAK_LIMIT : 0;
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
        <Button colour={primary} onClick={resetTimePeriods}><FaUndoAlt /></Button>
        <Button colour={primary} onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </Button>
      </ButtonTray>
      <TimerWheel percentage={percentage} wheelColour={primary} backgroundColour={background}>
        <Inner>
          <TypeTitle>{timePeriods > 0 ? type : "Set value to start"}</TypeTitle>
          <TimerTitle colour={primary} style={{ opacity: timePeriods > 0 ? '100%' : '50%' }}>{timeText}</TimerTitle>
          <NumberInput colour={primary} value={timePeriods} increment={incrementTimePeriods} decrement={decrementTimePeriods}></NumberInput>
        </Inner >
      </TimerWheel>
      <EndTime>End time: <span style={{ color: 'white' }}>{timePeriods > 0 ? timeToEnd : "00:00"}</span></EndTime>
    </Background>
  );
}



export default App;
