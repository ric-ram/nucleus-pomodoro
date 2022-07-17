import { useContext, useEffect } from 'react';

import { ReactComponent as DeleteIcon } from '../../../icons/deleteIcon.svg';
import React from 'react'
import { SettingContext } from '../../../context/SettingsContext';
import { useRef } from 'react';
import { useState } from 'react';

const TaskToDo = ({ todo }) => {

    const { setCurrentTask, updateTask, deleteTask } = useContext(SettingContext);

    const [checked, setChecked] = useState(todo.completed);
    const [disabled, setDisabled] = useState(true);
    const [inputText, setInputText] = useState(todo.task);

    const ref = useRef(null);

    useEffect(() => {
        if (!disabled) {
            ref.current.focus();
        }
    }, [disabled])

    function handleChange() { 
        if (!checked) {
            updateTask(todo, "completed", true);
        } else {
            updateTask(todo, "completed", false);
        }
        setChecked(!checked);
    }

    function handleEnter(e) {
        if(e.key === 'Enter') {
           e.preventDefault()
        }
    }

    function handleEdit(e) {
        setInputText(e.target.value);
    }

    function handleClickSave() {
        updateTask(todo, "task", inputText);
        setDisabled(!disabled)
    }

    function handleDelete() {
        deleteTask(todo);
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
                    value={inputText} 
                    disabled={disabled} 
                    onChange={handleEdit} 
                    onKeyPress={handleEnter}/>
            </a>
            <a href='#' className='edit' onClick={handleClickSave} >{disabled ? "Edit" : "Save"}</a>
            <a href="#" className='deleteIcon' onClick={handleDelete}>{<DeleteIcon />}</a>
        </div>
    )
}

export default TaskToDo