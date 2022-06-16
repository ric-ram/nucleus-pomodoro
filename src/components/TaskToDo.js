import { ReactComponent as DeleteIcon } from '../icons/deleteIcon.svg';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const TaskToDo = ({ todo, setToDo }) => {

    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [tempToDo, setTempToDo] = useState(todo);

    const ref = useRef(null);

    useEffect(() => {
        if (!disabled) {
            ref.current.focus();
        }
    }, [disabled])

    function handleChange() {
        setChecked(!checked);
    }

    //todo["task"]

    return (
        <div className='todo-placeHolder' >
            <form className="todo" onClick={handleChange}>
                <input type="checkbox"  checked={checked ? "checked" : ""}  onChange={handleChange} />
                <span className="checkmark"></span>
            </form>
            <input ref={ref} type="text" id="task" className={`task-name${checked ? " selected-task" : ""}`} value={tempToDo["task"]} disabled={disabled} onChange={(ch) => setTempToDo(tempToDo["task"] + ch.nativeEvent.data)}/>
            <a href='#' className='edit' onClick={() => setDisabled(!disabled)}>Edit</a>
            <span className='deleteIcon'>{<DeleteIcon />}</span>
        </div>
    )
}

export default TaskToDo