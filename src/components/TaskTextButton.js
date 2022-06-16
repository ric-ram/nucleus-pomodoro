import { useEffect, useRef, useState } from "react"

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

const TaskTextButton = ({ currentTask='Click here to create a task', text }) => {
  
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  
  return (
    <div ref={domNode} className="task-text-div" >
      <button   className='task-text-btn' onClick={() => setOpen(!open)}>{currentTask}</button>
      
      { open && 
        <div className="popup-left">
          <TaskMenu />
        </div> }
    </div>
  )
}

export default TaskTextButton