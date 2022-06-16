import { ReactComponent as DownArrow } from '../icons/arrowIcon.svg';
import ProjectsMenu from './ProjectsMenu';
import { useState } from 'react';

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
  return (
    <div className="task-menu">
        <h1>Project Manager</h1>
        <div className="line"></div>
        <form>
            <input type="text" id="taskname" placeholder="New task" />
        </form>
        <div className="mt-1 mb-1">
            <p className={ isLogged ? 'logged-in' : ''}>Hint: <a href="#" target="_blank" >Sign Up for FREE</a> to save tasks after refresh</p>
        </div>
        <SubMenu menu={<ProjectsMenu />} />
    </div>
)
}

export default TaskMenu