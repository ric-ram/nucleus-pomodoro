import React, { createContext, useState } from 'react';

import projectsData from '../projects.json';
import tasksData from '../tasks.json';
import timerComplete from '../audio/timerComplete.wav';
import timerLeftSound from '../audio/tickingClock.wav';

export const SettingContext = createContext();


const SettingsContextProvider = (props) => {
    const [isSignUp, setIsSignUp] = useState(true); 

    const audioTimerLeft = new Audio(timerLeftSound);
    const audioTimerComplete = new Audio(timerComplete);

    const [projectList, setProjectList] = useState(projectsData);
    const [currentProject, setCurrentProject] = useState(projectList[0])

    const [toDoList, setToDoList] = useState(tasksData);
    const [currentTask, setCurrentTask] = useState('Click here to create a task');

    const [currentTime, setCurrentTime] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const [startTimerAnimation, setStartTimerAnimation] = useState(false);
    const [timerSettings, setTimerSettings] = useState({
        work: 2,
        short: 2,
        long: 0.3,
        shortFreq: 1,
        longFreq: 2,
        notify: true,
        showNotifyMin: 1,
        autoSwitch: true,
        active: 'work',
        numPomodoros: 0
    });
    
    function saveSettings(updatedSettings) {
        setTimerSettings(updatedSettings);
        saveCurrentTimer(updatedSettings);
    }

    function saveCurrentTimer(settings) {
        switch(settings.active) {
            case 'work':
                setCurrentTime(settings.work)
                setTimerKey(1)
                break;
            case 'short-break':
                setCurrentTime(settings.short)
                setTimerKey(2)
                break;
            case 'long-break':
                setCurrentTime(settings.long)
                setTimerKey(3)
                break;
            default:
                setCurrentTime(0)
                break;
        }
    }

    function startTimer() {
        setStartTimerAnimation(true);
    }

    function pauseTimer() {
        setStartTimerAnimation(false);
    }

    function stopTimer() {
        setStartTimerAnimation(false);

        if (timerSettings.autoSwitch) {
            if (timerSettings.active === 'work') {
                timerSettings.numPomodoros++;
                
                if (timerSettings.numPomodoros >= timerSettings.shortFreq && timerSettings.numPomodoros < timerSettings.longFreq) {
                    timerSettings.active = 'short-break';
                } else if (timerSettings.numPomodoros === timerSettings.longFreq) {
                    timerSettings.active = 'long-break';
                    timerSettings.numPomodoros = 0;
                }
            } else {
                timerSettings.active = 'work';
            }
    
            saveSettings(timerSettings);
            startTimer();
        }
        
    }

    function resetTimer() {
        setStartTimerAnimation(false);
        setTimerKey(prevKey => prevKey + 1);
    }

    const time = ({ remainingTime }) => {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        if (timerSettings.active === 'work' && timerSettings.notify && remainingTime === (timerSettings.showNotifyMin * 60) && currentTime > timerSettings.showNotifyMin) {
            audioTimerLeft.play();
        }

        if (remainingTime === 1) {
            audioTimerComplete.play();
        }

        if (remainingTime < 0) {
            resetTimer();
        }
       
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0"+ seconds;
        }

        
        return `${minutes}:${seconds}`
    }

  return (
    <SettingContext.Provider value={{ currentTime, startTimerAnimation, startTimer, pauseTimer, stopTimer, resetTimer, saveSettings, timerSettings, time, timerKey, setTimerKey, toDoList, setToDoList, currentTask, setCurrentTask, projectList, setProjectList, currentProject, setCurrentProject, isSignUp, setIsSignUp }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider