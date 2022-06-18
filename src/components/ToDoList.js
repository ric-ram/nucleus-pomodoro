import React from 'react'
import TaskToDo from './TaskToDo'

const ToDoList = ({ toDoList, setToDoList }) => {

    const handleDeleteCompletes = () => {
        setToDoList(toDoList.filter(todo => !todo.complete));
    }

    
    return (
        <div className='todolist'>
            { toDoList.map(todo => {
                return (
                    <TaskToDo key={todo["id"]} todo={todo} toDoList={toDoList} setToDoList={setToDoList} />
                )
            })}
            <a href='#' className='delete-completes' onClick={handleDeleteCompletes} >Delete completed tasks</a>
        </div>
)
}

export default ToDoList