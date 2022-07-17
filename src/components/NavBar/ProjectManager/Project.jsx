import { SettingContext } from '../../../context/SettingsContext';
import { useContext } from 'react'

const Project = ({ project }) => {

    const { currentProject, setCurrentProject } = useContext(SettingContext);

    const handleOnClick = () => {
        setCurrentProject(project);
    }

    return (
        <button 
        type="button"   
        onClick={handleOnClick}
        className={currentProject.project_id === project.project_id ? 'selected' : ''}>
            {currentProject.project_id === project.project_id ? <>{project.proj_name}<i> (current)</i></> : project.proj_name}
        </button>
    )
}

export default Project