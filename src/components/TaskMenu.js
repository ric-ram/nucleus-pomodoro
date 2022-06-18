import { useContext, useState } from 'react';

import { ReactComponent as DownArrow } from '../icons/arrowIcon.svg';
import ProjectsMenu from './ProjectsMenu';
import { SettingContext } from './../context/SettingsContext';
import ToDoList from './ToDoList';

function SubMenu(props) {
    const [open, setOpen] = useState(false);

    return (
        <div className='mt-1'>
            <a href='#' className="select-proj" onClick={() => setOpen(!open)}>
                Change Project 
                <span role="img" className="down-icon">
                    {<DownArrow />}
                </span>
            </a>

            {open && props.menu}
        </div>
    )
}

const TaskMenu = ({ isLogged = true }) => {

    const { toDoList, setToDoList } = useContext(SettingContext);
    const [inputText, setInputText] = useState('');

    const handleInputText = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmitTodo = (e) => {
        if(e.key !== 'Enter') { // allows enter but prevents refresh of the page
            e.preventDefault()
        }
        setToDoList([
            ...toDoList,
            {
                id: toDoList.length + 1,
                task: inputText,
                complete: false
            }
        ])
        setInputText('');
    }

    return (
        <div className="task-menu">
            <h1>Project Manager</h1>
            <div className="line"></div>
            <form onSubmit={handleSubmitTodo}>
                <input type="text" id="taskname" placeholder="New task" className="task-input" onChange={handleInputText} value={inputText} />
            </form>
            <div className="mt-1 mb-1">
                <p className={ isLogged ? 'logged-in' : ''}>Hint: <a href="#" target="_blank" className='signUpLink' >Sign Up for FREE</a> to save tasks after refresh</p>
            </div>
            <SubMenu menu={<ProjectsMenu />} />
            <ToDoList toDoList={toDoList}  setToDoList={setToDoList} />
        </div>
    )
}

export default TaskMenu