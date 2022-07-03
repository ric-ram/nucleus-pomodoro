import ProjectPopUp from './ProjectPopUp';
import { useState } from 'react';

const ProjectSettings = ({ disabled, setDisabled }) => {

    const [openPopUp, setOpenPopUp] = useState(false);
    
    const handleEdit = () => {
        setDisabled(!disabled);
    }

    return (
        <div className='project-settings'>
            <span onClick={handleEdit}>Edit Project Name</span>
            <div className="proj-line"></div>
            <span onClick={() => {setOpenPopUp(!openPopUp)}} >Delete Project</span>
            <ProjectPopUp toDelete={true} open={openPopUp} setOpen={setOpenPopUp} />
        </div>
    )
}

export default ProjectSettings