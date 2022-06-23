import ActionButton from './ActionButton';
import { ReactComponent as RestartIcon } from '../../icons/restartIcon.svg';
import { SettingContext } from '../../context/SettingsContext';
import { useContext } from 'react';

const ActionMenu = () => {

  const { startTimer, pauseTimer, resetTimer } = useContext(SettingContext);

  return (
      <ul className='action-placeholder'>
          <li>
            <ActionButton title="Start" typeClass="pill-btn" actionClass="start-btn" _callback={startTimer} />
          </li>
          <li>
            <ActionButton title={<RestartIcon className='icon'/>} typeClass="circle-btn" actionClass="restart-btn" _callback={resetTimer} />
          </li>
          <li>
            <ActionButton title="Pause" typeClass="pill-btn" actionClass="pause-btn" _callback={pauseTimer} />
          </li>
      </ul>
  )
}

export default ActionMenu