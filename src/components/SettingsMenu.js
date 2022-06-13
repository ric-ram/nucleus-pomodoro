

const SettingsMenu = ({ isLogged=false }) => {
  if (!isLogged) {
    return (
      <div className="settings-menu-logged-off">
          <h1>Timer Settings</h1>
          <div className="line"></div>
          <p>Please <a href="#" target="_blank" >sign up for free</a> to customize timer settings!</p>
      </div>
    )
  } else {
    return (
      <div className="settings-menu-logged-in">
        <h1>Timer Settings</h1>
        <div className="line"></div>
        <div className="stage-settings">
          <form className="stage-form">
            <label for="pomodoro">Pomodoro</label>
            <input type="number" id="pomodoro" name="pomodoro" />
          </form>
          <form className="stage-form">
            <label for="short break">Short Break</label>
            <input type="number" id="short" name="short" />
          </form>
          <form className="stage-form">
            <label for="long break">Long Break</label>
            <input type="number" id="long" name="long" />
          </form>
        </div>
        <div className="line"></div>
        <div className="break-settings">
          <form className="break-form mb-1">
            <label for="short break every">Short break every</label>
            <input type="number" id="shorttime" name="shorttime"></input>
            <label>pomodoros</label>
          </form>
          <form className="break-form">
            <label for="long break every">Long break every</label>
            <input type="number" id="longtime" name="longtime"></input>
            <label>pomodoros</label>
          </form>
        </div>
        <div className="line"></div>
        <div className="notif-settings">
          <label for="notification before timer ends" className="mr-1">Notification before timer ends</label>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider"></span>
          </label>
          <form className="notif-form mt-1">
            <label for="show notification" className="mr-1" >Show notification</label>
            <input type="number" id="notif-minutes" name="notif-minutes" />
            <label className="ml-1">minutes before</label>
          </form>
        </div>
        <div className="line"></div>
        <div className="ml-1">
          <label for="auto switch to next phase" className="mr-1">Automatically switch to the next phase</label>
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider"></span>
          </label>
        </div>
        <div className="line"></div>
        <div className="set-btns">
          <button type="button" className="sqr-btn cancel-btn">Cancel</button>
          <button type="button" className="sqr-btn save-btn">Save</button>
        </div>
      </div>
    )
  }
  
}

export default SettingsMenu