import { SettingContext } from './../context/SettingsContext';
import TaskToDo from './TaskToDo'
import { useContext } from 'react'

const ToDoList = ({ toDoList, setToDoList }) => {

    const { currentProject } = useContext(SettingContext);
    
    const currentProjectTodo = () => {
       return toDoList.filter(el => el.projectId === currentProject.id);
    }

    const completedCount = () => {
        return currentProjectTodo().filter(el => el.complete).length;
    }

    const handleDeleteCompletes = () => {
        setToDoList(toDoList.filter(todo => todo.projectId === currentProject.id ? !todo.complete : todo));
    }

    return (
        <div className='todolist'>
            { currentProjectTodo().map(todo => {
                return (
                    <TaskToDo key={todo.id} todo={todo} toDoList={toDoList} setToDoList={setToDoList} />
                )
            })}
            { completedCount() !== 0 ? <a href='#' className='delete-completes' onClick={handleDeleteCompletes} >Delete completed tasks ({completedCount()})</a> : ''}

            
        </div>
)
}

export default ToDoList