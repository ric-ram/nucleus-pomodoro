import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { SettingContext } from '../../context/SettingsContext';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const Timer = ({ key = 1, time = 1, animate = false, children }) => {

  const { stopTimer } = useContext(SettingContext);
  const is1300 = useMediaQuery({ query: `(max-width: 1300px)` });
  const is1000 = useMediaQuery({ query: `(max-width: 1000px)` });
  const is850 = useMediaQuery({ query: `(max-width: 850px)` });

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={time >= 0 ? time * 60 : 0}
      colors={[
          '#03B5AA'
        ]}
      strokeWidth={ is850 ? 7 
                   : is1000 ? 9
                   : is1300 ? 11
                   : 15 }
      trailColor="transparent"
      size={ is850 ? 240
            : is1000 ? 300
            : is1300 ? 370
            : 450 }
      className="timer"
      onComplete={() => {
        stopTimer();
      }}
    >
      {children}
    </CountdownCircleTimer>
  )
}

export default Timer