import { SettingContext } from '../../../context/SettingsContext';
import TaskToDo from './TaskToDo'
import { useContext } from 'react'

const ToDoList = ({ toDoList }) => {

    const { currentProject, deleteCompletedTasks } = useContext(SettingContext);
    
    const currentProjectTodo = () => {
       return toDoList.filter(el => el.project_id === currentProject.project_id);
    }

    const completedCount = () => {
        return currentProjectTodo().filter(el => el.completed).length;
    }

    const handleDeleteCompletes = () => {
        deleteCompletedTasks();
    }

    return (
        <div className='todolist'>
            { currentProjectTodo().map(todo => {
                return (
                    <TaskToDo  key={todo.task_id + todo.project_id} todo={todo} />
                )
            })}
            { completedCount() !== 0 ? <a href='#' className='delete-completes' onClick={handleDeleteCompletes} >Delete completed tasks ({completedCount()})</a> : ''}

            
        </div>
)
}

export default ToDoList