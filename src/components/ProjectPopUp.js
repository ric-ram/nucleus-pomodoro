import React from 'react'

const ProjectPopUp = ({ open, setOpen }) => {
  return (open) ? (
    <div className='project-popup'>
        <div className='popup-placeholder'>
            <h3>Add New Project</h3>
            <button className='close-button' onClick={() => setOpen(!open)}>close</button>
        </div>
    </div>
  ) : "";
}

export default ProjectPopUp