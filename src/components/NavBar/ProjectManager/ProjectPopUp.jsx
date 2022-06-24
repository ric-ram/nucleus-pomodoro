import { useContext, useState } from 'react';

import { ReactComponent as CloseIcon } from '../../../icons/closeIcon.svg';
import { SettingContext } from '../../../context/SettingsContext';

const ProjectPopUp = ({ open, setOpen }) => {

  const { projectList, setProjectList } = useContext(SettingContext);
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmitProject = (e) => {
    e.preventDefault();
    setProjectList([
      ...projectList,
      {
        id: projectList.length + 1,
        project: inputText
      }
    ])
    setInputText('');
    setOpen(!open);
  }

  const handleClose = () => {
    setInputText('');
    setOpen(!open);
  }

  return (open) ? (
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
            <button type='submit' className='create-project' >Create</button>
        </form>
    </div>
  ) : "";
}

export default ProjectPopUp