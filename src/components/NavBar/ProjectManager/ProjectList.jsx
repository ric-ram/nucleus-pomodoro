import Project from './Project';
import { SettingContext } from '../../../context/SettingsContext';
import { useContext } from 'react';

const ProjectList = ({ isAuthenticated }) => {

  const { projectList } = useContext(SettingContext);

  return (
    <div className='projects'>
        { !isAuthenticated ? 
            <Project key={projectList[0].project_id} project={projectList[0]} />
        : projectList.map(proj => {
            return (
                <Project key={proj.project_id} project={proj} />
            )
        }) }
    </div>
  )
}

export default ProjectList