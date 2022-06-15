import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { SettingContext } from './../context/SettingsContext';
import { useContext } from 'react';

const Timer = ({ key = 1, time = 1, animate = false, children }) => {

  const { stopTimer } = useContext(SettingContext);

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={time * 60}
      colors={[
          '#03B5AA'
        ]}
      strokeWidth={15}
      trailColor="transparent"
      size={450}
      className="timer"
      onComplete={() => {
        stopTimer();
      }}
    >

    </CountdownCircleTimer>
  )
}

export default Timer