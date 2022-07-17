import React, { createContext, useState } from 'react';

import _ from 'lodash';
import timerComplete from '../audio/timerComplete.wav';
import timerLeftSound from '../audio/tickingClock.wav';
import uuid from 'react-uuid';

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
            .catch(err => err.json());
    }

    function saveSettings(updatedSettings) {
        if (isLoggedIn && !_.isEqual(timerSettings, updatedSettings)) {
            fetch('http://localhost:4200/updatesettings', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedSettings)
            })
            .then(res => res.json())
            .catch(err => err.json())
        }
        setTimerSettings(updatedSettings);
        saveCurrentTimer(updatedSettings);
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
            .catch(err => err.json())
        } else {
            return false;
        }
    }

    function updateCurrentProject(projectName) {
        if (isLoggedIn) {
            const newProject = {
                user_id: currentProject.user_id,
                project_id: currentProject.project_id,
                proj_name: projectName
            }

            fetch('http://localhost:4200/updateproject', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newProject)
            })
            .then(res => res.json())
            .then(project => {
                const newList = projectList.map(todo => {
                    if (todo.project_id === currentProject.project_id) {
                        return project[0];
                    }
                    return todo;
                });
                setProjectList(newList);
                return true;
            })
            .catch(err => err.json())
        }
    }

    function deleteCurrentProject() {
        fetch('http://localhost:4200/delproject', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ project_id: currentProject.project_id })
        })
        .then(res => res.json())
        .then(data => {
            setProjectList(projectList.filter((todo) => todo.project_id !== data[0].project_id));
            setToDoList(toDoList.filter((todo) => todo.projectId !== data[0].project_id));
            setDefaultProject();
        })
        .catch(err => err.json())
    }

    function addTaskToProject(taskName) {   
        if (isLoggedIn) {
            const newTask = {
                project_id: currentProject.project_id,
                task: taskName
            }

            fetch('http://localhost:4200/addtask', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTask)
            })
            .then(res => res.json())
            .then(task => {
                setToDoList([
                    ...toDoList,
                    task[0]
                ])
            })
            .catch(err => err.json())
        } else {
            setToDoList([
                ...toDoList,
                {
                    task_id: uuid(),
                    project_id: 0,
                    task: taskName,
                    num_pomodoros: 0,
                    completed: false
                }
            ])
        }

        
    }

    function updateTask(task, task_field, value) {
        const updatedTask = {
            ...task,
            [task_field]: value
        }

        if (isLoggedIn) {
            fetch('http://localhost:4200/updatetask', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedTask)
            })
            .then(res => res.json())
            .then(updatedTodo => {
                const updatedTodoList = toDoList.map(todo => {
                    if (todo.task_id === task.task_id) {
                        return updatedTodo[0];
                    }
                    return todo;
                });

                setToDoList(updatedTodoList);
            })
            .catch(err => err.json())
        } else {
            const updatedTodoList = toDoList.map(todo => {
                if (todo.task_id === task.task_id) {
                    return updatedTask;
                }
                return todo;
            })

            setToDoList(updatedTodoList);
        }
    }

    function deleteTask(task) {
        if (isLoggedIn) {
            fetch('http://localhost:4200/deltask', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    task_id: task.task_id,
                    project_id: task.project_id
                })
            })
            .then(res => res.json())
            .then(data => {
                setToDoList(toDoList.filter(el => el.task_id !== data[0].task_id));
            })
            .catch(err => err.json())
        } else {
            setToDoList(toDoList.filter((el) => el.task_id !== task.task_id));
        }
    }

    function deleteCompletedTasks() {
        if (isLoggedIn) {
            fetch('http://localhost:4200/delcompletedtasks', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    project_id: currentProject.project_id
                })
            })
            .then(res => res.json())
            .catch(err => err.json())
        }

        setToDoList(toDoList.filter(todo => todo.project_id === currentProject.project_id ? !todo.completed : todo));
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
    <SettingContext.Provider value={{ 
        currentTime, 
        startTimerAnimation, 
        startTimer, 
        pauseTimer, 
        stopTimer, 
        resetTimer, 
        saveSettings, 
        timerSettings, 
        time, 
        timerKey, 
        setTimerKey, 
        toDoList, 
        setToDoList, 
        currentTask, 
        setCurrentTask, 
        projectList, 
        setProjectList, 
        currentProject, 
        setCurrentProject, 
        isLoggedIn, 
        setIsLoggedIn, 
        setDefaultProject, 
        onLogin, 
        saveNewProject, 
        projectExists, 
        deleteCurrentProject,
        updateCurrentProject,
        addTaskToProject,
        updateTask,
        deleteTask, 
        deleteCompletedTasks
    }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider