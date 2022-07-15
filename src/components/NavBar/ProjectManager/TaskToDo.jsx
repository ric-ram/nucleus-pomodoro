import { useContext, useEffect } from 'react';

import { ReactComponent as DeleteIcon } from '../../../icons/deleteIcon.svg';
import React from 'react'
import { SettingContext } from '../../../context/SettingsContext';
import { useRef } from 'react';
import { useState } from 'react';

const TaskToDo = ({ todo, toDoList, setToDoList }) => {

    const { setCurrentTask } = useContext(SettingContext);

    const [checked, setChecked] = useState(todo.complete);
    const [disabled, setDisabled] = useState(true);

    const ref = useRef(null);

    useEffect(() => {
        if (!disabled) {
            ref.current.focus();
        }
    }, [disabled])

    const updateState = (field, value) => {
        const newState = toDoList.map(td => {
            if (td.task_id === todo.task_id) {
                return {
                    ...td,
                    [field]: value
                }
            }
            return td;
        })

        return newState;
    }

    function handleChange() { 
        if (!checked) {
            setToDoList(
                updateState("completed", true)
            )
        } else {
            setToDoList(
                updateState("completed", false)
            )
        }
        setChecked(!checked);
    }

    function handleEnter(e) {
        if(e.key === 'Enter') {
           e.preventDefault()
        }
    }

    function handleEdit(e) {
        setToDoList(
            updateState("task", e.target.value)
        )
    }

    function handleDelete() {
        setToDoList(toDoList.filter((el) => el.task_id !== todo.task_id));
    }

    function handleTaskSelect() {
        if (disabled) {
            setCurrentTask(todo.task);
        }
    }

    return (
        <div className='todo-placeHolder' >
            <form className="todo" onClick={handleChange}>
                <input 
                    type="checkbox"  
                    checked={checked ? "checked" : ""}  
                    onChange={handleChange} />
                <span className="checkmark"></span>
            </form>
            <a href='#' className='task-link' onClick={handleTaskSelect}>
                <textarea 
                    ref={ref} 
                    type="text" 
                    task_id="task" 
                    className={`task-name${checked ? " selected-task" : ""}`} 
                    value={todo.task} 
                    disabled={disabled} 
                    onChange={handleEdit} 
                    onKeyPress={handleEnter}/>
            </a>
            <a href='#' className='edit' onClick={() => setDisabled(!disabled)} >{disabled ? "Edit" : "Save"}</a>
            <a href="#" className='deleteIcon' onClick={handleDelete}>{<DeleteIcon />}</a>
        </div>
    )
}

export default TaskToDo