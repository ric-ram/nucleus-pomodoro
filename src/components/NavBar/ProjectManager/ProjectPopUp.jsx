import { useContext, useState } from 'react';

import { ReactComponent as CloseIcon } from '../../../icons/closeIcon.svg';
import { SettingContext } from '../../../context/SettingsContext';

const ProjectPopUp = ({ toDelete, open, setOpen }) => {

  const { projectExists, currentProject, saveNewProject, deleteCurrentProject } = useContext(SettingContext);
  const [inputText, setInputText] = useState('');
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    if (inputText.length >= 3) {
      const newProject = {
        proj_name: inputText
      };
      
      const exists = projectExists(newProject);

      if (!exists) {
        saveNewProject(newProject);
        setShowError(false);
        setInputText('');
        setOpen(!open);
      } else {
        setShowError(true);
      }     
    } else {
      setShowInfo(true);
      setShowError(false);
    }

  }

  const handleDeleteProject = (e) => {
    e.preventDefault();
    if (inputText === currentProject.proj_name) {
      deleteCurrentProject();
      setInputText('');
      setOpen(!open);
    } else {
      setShowInfo(true);
    }
  }

  const handleClose = () => {
    setInputText('');
    setOpen(!open);
  }

  return (open && !toDelete) ? (
    <div className='popup'>
        <form onSubmit={handleSubmitProject} className='popup-placeholder'>
            <h3>Create New Project</h3>
            <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
            <input 
              type="text" 
              project_id="newproject" 
              placeholder="New Project" 
              className="project-input" 
              onChange={handleOnChange}
              value={inputText} />

            {showError && <p className='project-error'>The Project already exists! Please enter a new Project name.</p>}
            {showInfo && <p className='project-info'>Please insert a Project name with 3 or more characters please.</p>}
            <button type='submit' className='submit' >Create</button>
        </form>
    </div>
  ) : (open && toDelete) ? (
    <div className='popup'>
      <form onSubmit={handleDeleteProject} className='popup-placeholder'>
          <h2>Warning!</h2>
          <p>Are you sure you want to delete this project?<br></br>You will be deleting all task associated with it.</p>
          <p className="info">Please enter the project name to delete. <i>Ex: "{currentProject.proj_name}"</i></p>
          <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
          <input 
            type="text" 
            project_id="newproject" 
            placeholder={currentProject.proj_name} 
            className="delete-input" 
            onChange={handleOnChange}
            value={inputText} />
            
          {showInfo && <p className='info'>Please enter the name of the project as it is written.</p>}
          <button type='submit' className='submit' >Delete</button>
        </form>
    </div>
  ) : "";
}

export default ProjectPopUp