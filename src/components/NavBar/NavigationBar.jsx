import { useContext, useEffect, useRef, useState } from 'react';

import { ReactComponent as CheckIcon } from '../../icons/taskIcon.svg';
import { ReactComponent as GearIcon } from '../../icons/settingsIcon.svg';
import { ReactComponent as ProfileIcon } from '../../icons/profileIcon.svg';
import ProfileMenu from './ProfileManager/ProfileMenu';
import { SettingContext } from './../../context/SettingsContext';
import SettingsMenu from './SettingsManager/SettingsMenu';
import StageBar from './StageManager/StageBar';
import TaskMenu from './ProjectManager/TaskMenu';

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
  const { callSignUp } = useContext(SettingContext);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  let menu = (props) => {
    switch(props.title) {
      case 'tasks': return (
        <TaskMenu callSignUp={callSignUp} isAuthenticated={props.isAuthenticated}/>
      );
      case 'settings': return (
        <SettingsMenu callSignUp={callSignUp} setParentState={() => setOpen(!open)} timerSettings={props.timerSettings} saveSettings={props.saveSettings} isAuthenticated={props.isAuthenticated} />
      );
      case 'profile': return (
        <ProfileMenu callSignUp={callSignUp} isAuthenticated={props.isAuthenticated} setOpen={setOpen} user={props.user} />
      );
      default: return({});
    }
  }

  return (
      <li ref={domNode} className={props.posClass}>
          <a href="#" className={[props.btnClass, props.iconClass, props.bgClass].join(' ')} onClick={() => setOpen(!open)} >
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
  const {user, isAuthenticated } = useContext(SettingContext);

  return (
    <Navbar>
        <NavIconItem 
          btnClass={"circle-btn"} 
          posClass={"top-left"} 
          iconClass={"icon-btn"} 
          bgClass={"w-bg"} 
          icon={<CheckIcon className='icon'/>} 
          title="tasks" 
          isAuthenticated={isAuthenticated} 
        ></NavIconItem>
        
        <NavBar 
          posClass={"center-col"} 
          bar={<StageBar timerSettings={timerSettings} saveSettings={saveSettings} />}
        ></NavBar>
        
        <NavIconItem 
          btnClass={"circle-btn"} 
          posClass={"top-right tpr-1"} 
          iconClass={"icon-btn"} 
          bgClass={"b-bg"} 
          icon={<GearIcon className='icon' />} 
          title="settings"  
          timerSettings={timerSettings} 
          saveSettings={saveSettings} 
          isAuthenticated={isAuthenticated}  
        ></NavIconItem>
        <NavIconItem 
          btnClass={"circle-btn"} 
          posClass={"top-right tpr-2"} 
          iconClass={"icon-btn"} 
          bgClass={"w-bg"} 
          icon={!isAuthenticated ? <ProfileIcon className='icon2' /> : <img src={user.picture} alt={user.name} />}
          title="profile" 
          user={user} 
          isAuthenticated={isAuthenticated} 
        ></NavIconItem>
    </Navbar>
  )
}

export default NavigationBar