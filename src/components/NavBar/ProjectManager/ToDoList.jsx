import { SettingContext } from '../../../context/SettingsContext';
import TaskToDo from './TaskToDo'
import { useContext } from 'react'

const ToDoList = ({ toDoList, setToDoList }) => {

    const { currentProject } = useContext(SettingContext);
    
    const currentProjectTodo = () => {
       return toDoList.filter(el => el.project_id === currentProject.project_id);
    }

    const completedCount = () => {
        return currentProjectTodo().filter(el => el.completed).length;
    }

    const handleDeleteCompletes = () => {
        setToDoList(toDoList.filter(todo => todo.project_id === currentProject.project_id ? !todo.completed : todo));
    }

    return (
        <div className='todolist'>
            { currentProjectTodo().map(todo => {
                return (
                    <TaskToDo key={todo.project_id} todo={todo} toDoList={toDoList} setToDoList={setToDoList} />
                )
            })}
            { completedCount() !== 0 ? <a href='#' className='delete-completes' onClick={handleDeleteCompletes} >Delete completed tasks ({completedCount()})</a> : ''}

            
        </div>
)
}

export default ToDoList