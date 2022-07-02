import React from 'react'
import { useEffect } from 'react';

const ProjectSettings = ({ disabled, setDisabled }) => {
    
    const handleEdit = () => {
        setDisabled(!disabled);
    }

    return (
        <div className='project-settings'>
            <span onClick={handleEdit}>Edit Project Name</span>
            <div className="proj-line"></div>
            <span>Delete Project</span>
        </div>
    )
}

export default ProjectSettings