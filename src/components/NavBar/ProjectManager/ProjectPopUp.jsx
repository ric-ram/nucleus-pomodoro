import { useContext, useState } from 'react';

import { ReactComponent as CloseIcon } from '../../../icons/closeIcon.svg';
import { SettingContext } from '../../../context/SettingsContext';

const ProjectPopUp = ({ toDelete, open, setOpen }) => {

  const { projectList, setProjectList, currentProject, toDoList, setToDoList, setDefaultProject } = useContext(SettingContext);
  const [inputText, setInputText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (inputText.length >= 3) {
      console.log(inputText)
      setProjectList([
        ...projectList,
        {
          id: projectList.length + 1,
          project: inputText
        }
      ])
      
      setInputText('');
      setOpen(!open);
    } else {
      setShowInfo(true);
    }

  }

  const handleDeleteProject = (e) => {
    e.preventDefault();
    if (inputText === currentProject.project) {
      setProjectList(projectList.filter((prj) => prj.id !== currentProject.id));
      setToDoList(toDoList.filter((todo) => todo.projectId !== currentProject.id));
      setDefaultProject();
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
    <div className='project-popup'>
        <form onSubmit={handleSubmitProject} className='popup-placeholder'>
            <h3>Create New Project</h3>
            <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
            <input 
              type="text" 
              id="newproject" 
              placeholder="New Project" 
              className="project-input" 
              onChange={handleOnChange}
              value={inputText} />

            {showInfo && <p className='info'>Please insert a Project name with 3 or more characters please.</p>}
            <button type='submit' className='submit' >Create</button>
        </form>
    </div>
  ) : (open && toDelete) ? (
    <div className='project-popup'>
      <form onSubmit={handleDeleteProject} className='popup-placeholder'>
          <h2>Warning!</h2>
          <p>Are you sure you want to delete this project?<br></br>You will be deleting all task associated with it.</p>
          <p className="info">Please enter the project name to delete. <i>Ex: "{currentProject.project}"</i></p>
          <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
          <input 
            type="text" 
            id="newproject" 
            placeholder={currentProject.project} 
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