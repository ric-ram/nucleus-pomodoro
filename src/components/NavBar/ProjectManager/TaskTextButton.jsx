import { useContext, useEffect, useRef, useState } from "react"

import { SettingContext } from './../../../context/SettingsContext';
import TaskMenu from "./TaskMenu";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
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

const TaskTextButton = ({ currentTask }) => {
  
  const [open, setOpen] = useState(false);
  const { callSignUp, isAuthenticated } = useContext(SettingContext);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  
  return (
    <div ref={domNode} className="task-text-div" >
      <button   className='task-text-btn' onClick={() => setOpen(!open)}>{currentTask.task}</button>
      
      { open && 
        <div className="popup-left">
          <TaskMenu callSignUp={callSignUp} isAuthenticated={isAuthenticated}/>
        </div> }
    </div>
  )
}

export default TaskTextButton