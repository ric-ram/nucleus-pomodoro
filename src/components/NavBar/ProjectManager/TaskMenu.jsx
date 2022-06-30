import { useContext, useState } from 'react';

import { ReactComponent as DownArrow } from '../../../icons/arrowIcon.svg';
import { Link } from "react-router-dom";
import ProjectsMenu from './ProjectsMenu';
import { SettingContext } from '../../../context/SettingsContext';
import ToDoList from './ToDoList';

function SubMenu(props) {
    return (
        <div className='mt-1'>
            <a href='#' className="select-proj" onClick={() => props.setOpen(!props.open)}>
                Change Project 
                <span role="img" className="down-icon">
                    {<DownArrow />}
                </span>
            </a>

            {props.open && props.menu}
        </div>
    )
}

const TaskMenu = ({ isLoggedIn }) => {

    const { toDoList, setToDoList } = useContext(SettingContext);
    const [inputText, setInputText] = useState('');
    const [openSubMenu, setOpenSubMenu] = useState(false);

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
                <p className={ isLoggedIn ? 'logged-in' : ''}>Hint: <Link to="/signup" className='signUpLink' >Sign Up for FREE</Link> to save tasks after refresh</p>
            </div>
            <SubMenu open={openSubMenu} setOpen={setOpenSubMenu} menu={<ProjectsMenu isLoggedIn={isLoggedIn} setOpenSubMenu={setOpenSubMenu} />} />
            <ToDoList toDoList={toDoList}  setToDoList={setToDoList} />
        </div>
    )
}

export default TaskMenu