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
        className={currentProject.id === project.id ? 'selected' : ''}>
            {currentProject.id === project.id ? <>{project.project}<i> (current)</i></> : project.project}
        </button>
    )
}

export default Project