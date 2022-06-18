import { ReactComponent as AddIcon } from '../icons/addIcon.svg';
import ProjectPopUp from './ProjectPopUp';
import { useState } from 'react';

const ProjectsMenu = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="project-menu">
        <div className='projects'>
            <button 
              type="button" 
              className='selected'>Default Project <i>(current)</i></button>
        </div>
        <div className="proj-line"></div>
        <div  className='add-proj'>
            <a href='#' onClick={() => setOpen(!open)}>
                {<AddIcon />}
                <span className='ml-text'>Add another project</span>
            </a>
            <ProjectPopUp open={open} setOpen={setOpen} />
        </div>

    </div>
  )
}

export default ProjectsMenu