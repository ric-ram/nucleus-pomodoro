import { ReactComponent as AddIcon } from '../icons/addIcon.svg';

const ProjectsMenu = () => {
  return (
    <div className="project-menu">
        <div className='projects'>
            <button type="button" className='selected'>Default Project <i>(current)</i></button>
        </div>
        <div className="proj-line"></div>
        <div  className='add-proj'>
            <a href='#' >
                {<AddIcon />}
                <span className='ml-text'>Add another project</span>
            </a>
        </div>

    </div>
  )
}

export default ProjectsMenu