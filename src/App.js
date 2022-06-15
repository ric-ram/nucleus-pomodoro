import ActionMenu from './components/ActionMenu';
import NavigationBar from './components/NavigationBar';
import { SettingContext } from './context/SettingsContext';
import TaskTextButton from './components/TaskTextButton';
import Timer from './components/Timer';
import { useContext } from 'react';

function App() {

  const { startTimerAnimation, timerSettings, saveSettings } = useContext(SettingContext);
  
  return (
    <>
      <NavigationBar timerSettings={timerSettings} saveSettings={saveSettings} />
      <div className='center'>
        <TaskTextButton />
      </div>
      <div className='container'>
        <div className="timer-container">
          <div className="timer-wrapper">
            <Timer animate={startTimerAnimation} />
          </div>
        </div>
        <ActionMenu />
      </div>
    </>
  );
}

export default App;
