import { ReactComponent as AddIcon } from '../../../icons/addIcon.svg';
import ProjectList from './ProjectList';
import ProjectPopUp from './ProjectPopUp';
import { useState } from 'react';

const ProjectsMenu = ({ isLoggedIn }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="project-menu">
        <ProjectList isLogged={isLoggedIn} />
        <div className="proj-line"></div>
        <div  className='add-proj'>
            <a href='#' onClick={() => isLoggedIn && setOpen(!open)}>
                {<AddIcon />}
                <span className='ml-text'>Add another project</span>
            </a>
            <ProjectPopUp open={open} setOpen={setOpen} />
        </div>

    </div>
  )
}

export default ProjectsMenu