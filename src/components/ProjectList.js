import Project from './Project';
import { SettingContext } from './../context/SettingsContext';
import { useContext } from 'react';

const ProjectList = ({ setOpenSubMenu }) => {

  const { projectList } = useContext(SettingContext);

  return (
    <div className='projects'>
        { projectList.map(proj => {
            return (
                <Project key={proj.id} project={proj} setOpenSubMenu={setOpenSubMenu} />
            )
        }) }
    </div>
  )
}

export default ProjectList