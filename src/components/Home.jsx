import { useContext, useEffect } from 'react';

import ActionMenu from './Timer/ActionMenu';
import NavigationBar from './NavBar/NavigationBar';
import { SettingContext } from '../context/SettingsContext';
import TaskTextButton from './NavBar/ProjectManager/TaskTextButton';
import Timer from './Timer/Timer';

const Home = () => {
    const { currentTime, startTimerAnimation, stopTimer, timerSettings, saveSettings, time, timerKey, currentTask, isAuthenticated, onAuthenticate, firstTime } = useContext(SettingContext);

    useEffect(() => {
        if (isAuthenticated && firstTime) {
            onAuthenticate()
        } else {
            saveSettings(timerSettings)
        }
    }, [timerSettings, stopTimer])

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
    )
}

export default Home