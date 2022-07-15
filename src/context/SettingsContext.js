import React, { createContext, useState } from 'react';

import _ from 'lodash';
import timerComplete from '../audio/timerComplete.wav';
import timerLeftSound from '../audio/tickingClock.wav';

export const SettingContext = createContext();

const SettingsContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const audioTimerLeft = new Audio(timerLeftSound);
    const audioTimerComplete = new Audio(timerComplete);

    const [projectList, setProjectList] = useState([{
        project_id: 0,
        user_id: 0,
        proj_name: 'Default Project'
    }]);
    const [currentProject, setCurrentProject] = useState(projectList[0])

    const [toDoList, setToDoList] = useState([]);
    const [currentTask, setCurrentTask] = useState('Click here to create a task');

    const [currentTime, setCurrentTime] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const [startTimerAnimation, setStartTimerAnimation] = useState(false);
    const [timerSettings, setTimerSettings] = useState({
        user_id: 0,
        settings_id: 0,
        work_time: 10,
        short_brk_time: 2,
        long_brk_time: 4,
        short_brk__brk_freq: 1,
        long_brk__brk_freq: 5,
        show_notif: true,
        show_notif_at: 1,
        auto_switch: true,
        active_state: 'work',
        num_pomodoros: 0
    });

    function onLogin() {
        const headers = { 'Content-Type': 'application/json' }
        fetch('http://localhost:4200/getdata?user_id=test', { headers })
            .then(resp => resp.json())
            .then(data => {
                setTimerSettings(data.settings[0]);
                setProjectList(data.projects);
                setCurrentProject(data.projects[0]);
                setToDoList(data.tasks);
            })
            .catch(err => console.log(err));
    }

    function setDefaultProject() {
        setCurrentProject(projectList[0]);
    }

    function projectExists(newProject) {
        return projectList.some(el => el.proj_name === newProject.proj_name);
    }

    function saveNewProject(newProject) {
        console.log(newProject)
        if (isLoggedIn) {
            fetch('http://localhost:4200/addproject', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newProject)
            })
            .then(res => res.json())
            .then(project => {
                setProjectList([
                    ...projectList,
                    project[0]
                ])
                return true;
            })
            .catch(err => console.log)
        } else {
            return false;
        }
    }
    
    function saveSettings(updatedSettings) {
        if (isLoggedIn && !_.isEqual(timerSettings, updatedSettings)) {
            fetch('http://localhost:4200/updatesettings', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedSettings)
            })
            .then(res => console.log(res.json()))
            .catch(err => console.log)
        }
        setTimerSettings(updatedSettings);
        saveCurrentTimer(updatedSettings);
    }

    function saveCurrentTimer(settings) {
        switch(settings.active_state) {
            case 'work':
                setCurrentTime(settings.work_time)
                setTimerKey(1)
                break;
            case 'short-break':
                setCurrentTime(settings.short_brk_time)
                setTimerKey(2)
                break;
            case 'long-break':
                setCurrentTime(settings.long_brk_time)
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

        if (timerSettings.auto_switch) {
            if (timerSettings.active_state === 'work') {
                timerSettings.num_pomodoros++;
                
                if (timerSettings.num_pomodoros >= timerSettings.short_brk_freq && timerSettings.num_pomodoros < timerSettings.long_brk_freq) {
                    timerSettings.active_state = 'short-break';
                } else if (timerSettings.num_pomodoros === timerSettings.long_brk_freq) {
                    timerSettings.active_state = 'long-break';
                    timerSettings.num_pomodoros = 0;
                }
            } else {
                timerSettings.active_state = 'work';
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

        if (timerSettings.active_state === 'work' && timerSettings.show_notif && remainingTime === (timerSettings.show_notif_at * 60) && currentTime > timerSettings.show_notif_at) {
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
    <SettingContext.Provider value={{ currentTime, startTimerAnimation, startTimer, pauseTimer, stopTimer, resetTimer, saveSettings, timerSettings, time, timerKey, setTimerKey, toDoList, setToDoList, currentTask, setCurrentTask, projectList, setProjectList, currentProject, setCurrentProject, isLoggedIn, setIsLoggedIn, setDefaultProject, onLogin, saveNewProject, projectExists }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider