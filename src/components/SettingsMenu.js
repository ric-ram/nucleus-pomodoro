import { useState } from 'react';

const SettingsMenu = ({ isLogged = true, setParentState, timerSettings, saveSettings }) => {

  const [ tempSettings, saveTemp ] = useState(timerSettings);
  
  const handleChange = input => {
    const { name, value } = input.target;

    switch(name) {
      case 'work':
        saveTemp({
          ...tempSettings,
          work: parseInt(value)
        });
        break;
      case 'short':
        saveTemp({
          ...tempSettings,
          short: parseInt(value)
        });
        break;
      case 'long':
        saveTemp({
          ...tempSettings,
          long: parseInt(value)
        });
        break;
      default: break;
    }
  }

  
  const handleSubmit = e => {
    saveSettings(tempSettings);
    setParentState();
    e.preventDefault();
    //updateExecute(newTimer)
  }

  const handleCancel = e => {
    setParentState();
    e.preventDefault();
  }

  if (!isLogged) {
    return (
      <div id="menu" className="settings-menu-logged-off">
          <h1>Timer Settings</h1>
          <div className="line"></div>
          <p>Please <a href="#" target="_blank" >sign up htmlFor free</a> to customize timer settings!</p>
      </div>
    )
  } else {
    return (
      <div id="menu" className="settings-menu-logged-in">
        <h1>Timer Settings</h1>
        <div className="line"></div>
        <form noValidate onSubmit={handleSubmit} >
          <div className="stage-settings">
            <div className="stage-form">
              <label htmlFor="Work">Work</label>
              <input type="number" id="work" name="work" onChange={handleChange} value={tempSettings.work} />
            </div>
            <div className="stage-form">
              <label htmlFor="short break">Short Break</label>
              <input type="number" id="short" name="short" onChange={handleChange} value={tempSettings.short} />
            </div>
            <div className="stage-form">
              <label htmlFor="long break">Long Break</label>
              <input type="number" id="long" name="long" onChange={handleChange} value={tempSettings.long} />
            </div>
          </div>
          <div className="line"></div>
          <div className="break-settings">
            <div className="break-form mb-1">
              <label htmlFor="short break every">Short break every</label>
              <input type="number" id="shorttime" name="shorttime"></input>
              <label>pomodoros</label>
            </div>
            <div className="break-form">
              <label htmlFor="long break every">Long break every</label>
              <input type="number" id="longtime" name="longtime"></input>
              <label>pomodoros</label>
            </div>
          </div>
          <div className="line"></div>
          <div className="notif-settings">
            <label htmlFor="notification before timer ends" className="mr-1">Notification before timer ends</label>
            <label className="switch">
              <input type="checkbox"/>
              <span className="slider"></span>
            </label>
            <div className="notif-form mt-1">
              <label htmlFor="show notification" className="mr-1" >Show notification</label>
              <input type="number" id="notif-minutes" name="notif-minutes" />
              <label className="ml-1">minutes before</label>
            </div>
          </div>
          <div className="line"></div>
          <div className="ml-1">
            <label htmlFor="auto switch to next phase" className="mr-1">Automatically switch to the next phase</label>
            <label className="switch">
              <input type="checkbox"/>
              <span className="slider"></span>
            </label>
          </div>
          <div className="line"></div>
          <div className="set-btns">
            <button type="button" className="sqr-btn cancel-btn" onClick={handleCancel} >Cancel</button>
            <button type="submit" className="sqr-btn save-btn" >Save</button>
          </div>
        </form>
      </div>
    )
  }
  
}

export default SettingsMenu