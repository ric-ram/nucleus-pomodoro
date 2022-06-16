import { useEffect, useRef, useState } from 'react';

import { ReactComponent as CheckIcon } from '../icons/taskIcon.svg';
import { ReactComponent as GearIcon } from '../icons/settingsIcon.svg';
import { ReactComponent as ProfileIcon } from '../icons/profileIcon.svg';
import ProfileMenu from '../components/ProfileMenu';
import SettingsMenu from '../components/SettingsMenu';
import StageBar from '../components/StageBar';
import TaskMenu from '../components/TaskMenu';

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

function Navbar(props) {
    return (
      <nav>
        <ul>{props.children}</ul>
      </nav>
    )
  }
  
function NavIconItem(props) {

  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  let menu = (props) => {
    switch(props.title) {
      case 'tasks': return (
        <TaskMenu />
      );
      case 'settings': return (
        <SettingsMenu setParentState={() => setOpen(!open)} timerSettings={props.timerSettings} saveSettings={props.saveSettings} />
      );
      case 'profile': return (
        <ProfileMenu />
      );
      default: return({});
    }
  }

  return (
      <li ref={domNode} className={props.posClass}>
          <a href="#" className={[props.btnClass, props.iconClass, props.bgClass, props.menuClass].join(' ')} onClick={() => setOpen(!open)} >
              {props.icon}
              
          </a>
          
          {open && menu(props)}

      </li>
  )
}

function NavBar(props) {
  return (
    <li className={props.posClass}>
        {props.bar}
    </li>
  )
}

const NavigationBar = ({ timerSettings, saveSettings }) => {
  return (
    <Navbar>
        <NavIconItem btnClass={"circle-btn"} posClass={"top-left"} iconClass={"icon-btn"} bgClass={"w-bg"} menuClass={"task-menu-btn"} icon={<CheckIcon />} title="tasks" ></NavIconItem>
        
        <NavBar posClass={"center-col"} bar={<StageBar timerSettings={timerSettings} saveSettings={saveSettings} />}></NavBar>
        
        <NavIconItem btnClass={"circle-btn"} posClass={"top-right"} iconClass={"icon-btn"} bgClass={"b-bg"} icon={<GearIcon />} title="settings"  timerSettings={timerSettings} saveSettings={saveSettings} ></NavIconItem>
        <NavIconItem btnClass={"circle-btn"} posClass={"top-right"} iconClass={"icon-btn"} bgClass={"w-bg"} icon={<ProfileIcon />} title="profile"></NavIconItem>
    </Navbar>
  )
}

export default NavigationBar