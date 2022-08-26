import React, { createContext, useState } from 'react';

import _ from 'lodash';
import timerComplete from '../audio/timerComplete.wav';
import timerLeftSound from '../audio/tickingClock.wav';
import { useAuth0 } from "@auth0/auth0-react";
import uuid from 'react-uuid';

export const SettingContext = createContext();

const SettingsContextProvider = (props) => {

    const { loginWithRedirect, 
        isAuthenticated, 
        getAccessTokenSilently,
        logout,
        user 
    } = useAuth0();

    const [firstTime, setfirstTime] = useState(true);

    const audioTimerLeft = new Audio(timerLeftSound);
    const audioTimerComplete = new Audio(timerComplete);

    const [projectList, setProjectList] = useState([{
        project_id: 0,
        proj_name: 'Default Project'
    }]);
    const [currentProject, setCurrentProject] = useState(projectList[0])

    const [toDoList, setToDoList] = useState([]);
    const [currentTask, setCurrentTask] = useState({
        task_id: 0,
        project_id: -1,
        task: 'Click here to create a task',
        total_pomodoros: 0,
        completed: false
    });

    const [currentTime, setCurrentTime] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const [startTimerAnimation, setStartTimerAnimation] = useState(false);
    const [timerSettings, setTimerSettings] = useState({
        settings_id: 0,
        work_time: 25,
        short_brk_time: 5,
        long_brk_time: 15,
        short_brk__brk_freq: 1,
        long_brk__brk_freq: 5,
        show_notif: true,
        show_notif_at: 1,
        auto_switch: true,
        active_state: 'work',
        num_pomodoros: 0
    });

    function callLogin() {
        console.log('login')
        loginWithRedirect();
        // axios.get('http://localhost:4200/login')
        // .then(resp => console.log(resp.data))
        // .catch(e => console.log(e.message));
    }

    function callSignUp() {
        loginWithRedirect({ screen_hint: 'signup' });
        // axios.get('http://localhost:4200/signup')
        // .then(resp => console.log(resp.data))
        // .catch(e => console.log(e.message));
    }

    async function createHeader() {
        try {
            const token = await getAccessTokenSilently(); 
            const headers = { 
                'Content-Type': 'application/json', 
                authorization: `Bearer ${token}`
            }
            return headers;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    } 

    function onAuthenticate() {
        createHeader()
        .then(headers => {
            fetch(`${process.env.REACT_APP_API_URI}/getdata`, { headers })
            .then(resp => resp.json())
            .then(data => {
                setTimerSettings(data.settings[0]);
                setProjectList(data.projects.flat());
                setCurrentProject(data.projects[0][0]);
                console.log(data.tasks)
                setToDoList(data.tasks);
                setfirstTime(false);
            })
            .catch(err => err.json());
        })
        .catch(err => {
            throw new Error(`${err.message}`)
        })
    }

    function resetPassword() {
        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/resetpwd`, {
                    method: 'POST',
                    headers: headers
                })
                .then(res => res.json())
                .catch(err => err.json())
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        }
    }

    function deleteUser() {
        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/deluser`, {
                    method: 'POST',
                    headers: headers
                })
                .then(res => res.json())
                .catch(err => err.json())
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        }
    }

    function saveSettings(updatedSettings) {
        if (isAuthenticated && !_.isEqual(timerSettings, updatedSettings)) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/updatesettings`, {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify(updatedSettings)
                })
                .then(res => res.json())
                .catch(err => err.json())
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
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
        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/addproject`, {
                    method: 'post',
                    headers: headers,
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
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        } else {
            return false;
        }
    }

    function updateCurrentProject(projectName) {
        if (isAuthenticated) {
            const newProject = {
                project_id: currentProject.project_id,
                proj_name: projectName
            }

            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/updateproject`, {
                    method: 'post',
                    headers: headers,
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
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        }
    }

    function deleteCurrentProject() {
        createHeader()
        .then(headers => {
            fetch(`${process.env.REACT_APP_API_URI}/delproject`, {
                method: 'post',
                headers: headers,
                body: JSON.stringify({ project_id: currentProject.project_id })
            })
            .then(res => res.json())
            .then(data => {
                setProjectList(projectList.filter((todo) => todo.project_id !== data[0].project_id));
                setToDoList(toDoList.filter((todo) => todo.projectId !== data[0].project_id));
                setDefaultProject();
            })
            .catch(err => err.json())
        })
        .catch(err => {
            throw new Error(`${err.message}`)
        })
    }

    function addTaskToProject(taskName) {   
        if (isAuthenticated) {
            const newTask = {
                project_id: currentProject.project_id,
                task: taskName
            }

            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/addtask`, {
                    method: 'post',
                    headers: headers,
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
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
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

        const update = (updatedTask) => {
            const updatedTodoList = toDoList.map(todo => {
                if (todo.task_id === task.task_id) {
                    return updatedTask;
                }
                return todo;
            })

            setToDoList(updatedTodoList);
            setCurrentTask(updatedTask);
        }

        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/updatetask`, {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify(updatedTask)
                })
                .then(res => res.json())
                .then(updatedTodo => {
                    update(updatedTodo[0]);
                })
                .catch(err => err.json())
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        } else {
            update(updatedTask);
        }
    }

    function deleteTask(task) {
        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/deltask`, {
                    method: 'post',
                    headers: headers,
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
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
        } else {
            setToDoList(toDoList.filter((el) => el.task_id !== task.task_id));
        }
    }

    function deleteCompletedTasks() {
        if (isAuthenticated) {
            createHeader()
            .then(headers => {
                fetch(`${process.env.REACT_APP_API_URI}/delcompletedtasks`, {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({
                        project_id: currentProject.project_id
                    })
                })
                .then(res => res.json())
                .catch(err => err.json())
            })
            .catch(err => {
                throw new Error(`${err.message}`)
            })
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
        currentTask, 
        setCurrentTask, 
        projectList, 
        currentProject, 
        setCurrentProject, 
        onAuthenticate, 
        saveNewProject, 
        projectExists, 
        deleteCurrentProject,
        updateCurrentProject,
        addTaskToProject,
        updateTask,
        deleteTask, 
        deleteCompletedTasks,
        callLogin, 
        callSignUp, 
        isAuthenticated, 
        logout, 
        user,
        firstTime,
        resetPassword,
        deleteUser
    }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider