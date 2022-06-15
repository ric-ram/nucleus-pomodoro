import { React, useContext, useEffect, useRef, useState } from 'react'

import { ReactComponent as CheckIcon } from '../icons/taskIcon.svg';
import { ReactComponent as GearIcon } from '../icons/settingsIcon.svg';
import { ReactComponent as ProfileIcon } from '../icons/profileIcon.svg';
import ProfileMenu from '../components/ProfileMenu';
import { SettingContext } from './../context/SettingsContext';
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
  const { timerSettings, saveSettings } = useContext(SettingContext);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  let menu = (title) => {
    switch(props.title) {
      case 'tasks': return (
        <TaskMenu />
      );
      case 'settings': return (
        <SettingsMenu setParentState={() => setOpen(!open)} timerSettings={timerSettings} saveSettings={saveSettings} />
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
          {/* {open && props.children} */}
          {open && menu(props.title)}

      </li>
  )
}

function NavMenu(props) {
    return (
      <li className={props.posClass}>
          {props.menu}
      </li>
    )
}

const NavigationBar = () => {
  return (
    <Navbar>
        <NavIconItem btnClass={"circle-btn"} posClass={"top-left"} iconClass={"icon-btn"} bgClass={"w-bg"} menuClass={"task-menu-btn"} icon={<CheckIcon />} title="tasks" ></NavIconItem>
        
        <NavMenu posClass={"center-col"} menu={<StageBar />} ></NavMenu>
        
        <NavIconItem btnClass={"circle-btn"} posClass={"top-right"} iconClass={"icon-btn"} bgClass={"b-bg"} icon={<GearIcon />} title="settings"></NavIconItem>
        <NavIconItem btnClass={"circle-btn"} posClass={"top-right"} iconClass={"icon-btn"} bgClass={"w-bg"} icon={<ProfileIcon />} title="profile"></NavIconItem>
    </Navbar>
  )
}

export default NavigationBar