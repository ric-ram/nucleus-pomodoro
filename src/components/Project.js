import { SettingContext } from './../context/SettingsContext';
import { useContext } from 'react'

const Project = ({ project, setOpenSubMenu }) => {

    const { currentProject, setCurrentProject } = useContext(SettingContext);

    const handleOnClick = () => {
        setCurrentProject(project);
        setOpenSubMenu(false);
    }

    return (
        <button 
        type="button"   
        onClick={handleOnClick}
        className={currentProject.id === project.id ? 'selected' : ''}>
            {project.project}
        </button>
    )
}

export default Project