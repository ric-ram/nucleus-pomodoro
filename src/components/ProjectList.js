import Project from './Project';
import { SettingContext } from './../context/SettingsContext';
import { useContext } from 'react';

const ProjectList = ({ setOpenSubMenu, isLogged }) => {

  const { projectList } = useContext(SettingContext);

  return (
    <div className='projects'>
        { !isLogged ? 
            <Project key={projectList[0].id} project={projectList[0]} setOpenSubMenu={setOpenSubMenu} />
        : projectList.map(proj => {
            return (
                <Project key={proj.id} project={proj} setOpenSubMenu={setOpenSubMenu} />
            )
        }) }
    </div>
  )
}

export default ProjectList