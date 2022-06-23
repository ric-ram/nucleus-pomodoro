import { useContext, useEffect } from 'react';

import ActionMenu from './components/ActionMenu';
import NavigationBar from './components/NavigationBar';
import { SettingContext } from './context/SettingsContext';
import TaskTextButton from './components/TaskTextButton';
import Timer from './components/Timer';

function App() {

  const { currentTime, startTimerAnimation, stopTimer, timerSettings, saveSettings, time, timerKey, currentTask } = useContext(SettingContext);
  
  useEffect(() => {saveSettings(timerSettings)}, [timerSettings, stopTimer])

  return (
    <>
      <NavigationBar 
        timerSettings={timerSettings} 
        saveSettings={saveSettings} 
      />
      <div className='main'>
        <TaskTextButton 
          currentTask={currentTask}
        />
        <div className='container'>
          <div className="timer-container">
            <div className="timer-wrapper">
              <Timer 
                key={timerKey}
                time={currentTime} 
                animate={startTimerAnimation} 
              >{time}</Timer>
            </div>
          </div>
          <ActionMenu />
        </div>
      </div>
    </>
  );
}

export default App;
