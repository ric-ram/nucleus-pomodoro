import { useContext, useEffect, useRef, useState } from 'react';

import { ReactComponent as CheckIcon } from '../../../icons/checkIcon.svg';
import { ReactComponent as DownArrow } from '../../../icons/arrowIcon.svg';
import ProjectSettings from './ProjectSettings';
import ProjectsMenu from './ProjectsMenu';
import { SettingContext } from '../../../context/SettingsContext';
import { ReactComponent as SettingsIcon } from '../../../icons/settingsIcon.svg';
import ToDoList from './ToDoList';

let useClickOutside = (handler) => {
    let domNode = useRef();
  
    useEffect(() => {       
      let maybeHandler = (event) => {
        if (!domNode.current?.contains(event.target)) {
            handler();
        }
      };
  
      document.addEventListener("mousedown", maybeHandler);
  
      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });
  
    return domNode;
};

function SubMenuTitle(props) {

    const { setCurrentProject } = useContext(SettingContext);

    const editRef = useRef();

    useEffect(() => {
        if (!props.disabled) {
            editRef.current?.focus();
        }
    }, [props.disabled])

    const updateProject = (field, value) => {
        const newState = props.projectList.map(prj => {
            if (prj.id === props.currentProject.id) {
                setCurrentProject({
                    ...prj,
                    [field]: value
                });
                return {
                    ...prj,
                    [field]: value
                }
            }
            return prj;
        })

        return newState;
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter') {
           e.preventDefault()
        }
    }

    const handleEdit = (e) => {
        props.setProjectList(
            updateProject("project", e.target.value)
        )
    }

    return (
        <textarea 
            ref={editRef}
            type="text" 
            id="task" 
            rows={1}
            className="sub-menu-title" 
            value={props.value}
            disabled={props.disabled} 
            onChange={handleEdit} 
            onKeyPress={handleEnter} 
        />
    )
}

function SubMenu(props) {
    const [openSettings, setOpenSettings] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    let projectNode = useClickOutside(() => {
        props.setOpen(false);
    });

    let settingsNode = useClickOutside(() => {
        setOpenSettings(false);
    });

    const handleDoneClick = () => {
        setDisabled(!disabled);
        //props.setOpen(false);
    }
    
    return (
        <div className='mt-1 sub-menu'>
            <div ref={projectNode} href='#' className="select-proj" >
                <div className="sub-menu-title-div" onClick={() => props.setOpen(!props.open)}>
                    <SubMenuTitle disabled={disabled} value={props.currentProject.id === props.projectList[0].id ? 'Change Project' : props.currentProject.project}  projectList={props.projectList} setProjectList={props.setProjectList} currentProject={props.currentProject} />

                    <span role="img" className="down-icon">
                        {disabled ? <DownArrow /> : <CheckIcon onClick={handleDoneClick} />}
                    </span>
                </div>
                {disabled && props.open && <ProjectsMenu isAuthenticated={props.isAuthenticated} />}
            </div>

            
            
            {props.currentProject.id !== props.projectList[0].id ? 
            <div ref={settingsNode} className='gear-icon' >
                <SettingsIcon onClick={() => setOpenSettings(!openSettings)} />
                {openSettings && <ProjectSettings disabled={disabled} setDisabled={setDisabled} />}
            </div> : ''}
        </div>
    )
}

const TaskMenu = ({ callSignUp, isAuthenticated }) => {

    const { toDoList, setToDoList, currentProject, projectList, setProjectList } = useContext(SettingContext);
    const [inputText, setInputText] = useState('');
    const [openSubMenu, setOpenSubMenu] = useState(false);

    const handleInputText = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmitTodo = (e) => {
        if(e.key !== 'Enter') { // allows enter but prevents refresh of the page
            e.prevenprjefault()
        }
        setToDoList([
            ...toDoList,
            {
                id: toDoList.length + 1,
                task: inputText,
                complete: false
            }
        ])
        setInputText('');
    }

    return (
        <div className="task-menu">
            <h1>Project Manager</h1>
            <div className="line"></div>
            <form onSubmit={handleSubmitTodo}>
                <input type="text" id="taskname" placeholder="New task" className="task-input" onChange={handleInputText} value={inputText} />
            </form>
            <div className="mt-1 mb-1">
                <p className={ isAuthenticated ? 'logged-in' : ''}>Hint: <a href='#' className='signUpLink' onClick={callSignUp} >Sign Up for FREE</a> to save tasks after refresh</p>
            </div>
            <SubMenu open={openSubMenu} setOpen={setOpenSubMenu} projectList={projectList} currentProject={currentProject} isAuthenticated={isAuthenticated}  setProjectList={setProjectList} />
            <ToDoList toDoList={toDoList}  setToDoList={setToDoList} />
        </div>
    )
}

export default TaskMenu