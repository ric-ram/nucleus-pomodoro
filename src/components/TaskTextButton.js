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

const TaskTextButton = ({ currentTask='Click here to create a task', _callback }) => {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  
  return (
    <>
      <button  ref={domNode} className='task-text-btn' onClick={() => setOpen(!open)}>{currentTask}</button>
      {open && <div className="popup-left">
        <TaskMenu/>
      </div>}
    </>
  )
}

export default TaskTextButton