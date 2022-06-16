import React from 'react'
import TaskToDo from './TaskToDo'

const ToDoList = ({ toDoList, setToDoList }) => {
    
    return (
        <div>
            { toDoList.map(todo => {
                return (
                    <TaskToDo key={todo["id"]} todo={todo} setToDo={setToDoList} />
                )
            })}
        </div>
)
}

export default ToDoList