import React, { createContext } from 'react'

import { useState } from 'react';

export const SettingContext = createContext();

const SettingsContextProvider = (props) => {

    const [startTimerAnimation, setStartTimerAnimation] = useState(false);
    const [timerSettings, setTimerSettings] = useState({
        work: 1,
        short: 0.2,
        long: 0.5,
        shortFreq: 1,
        longFreq: 5,
        notify: true,
        showNotifyMin: 5,
        autoSwitch: true,
        active: 'work'
      });
    
      function saveSettings(tempSettings) {
        setTimerSettings(tempSettings);
      }

    function startTimer() {
        setStartTimerAnimation(true);
    }

    function pauseTimer() {
        setStartTimerAnimation(false);
    }

    function stopTimer() {
        setStartTimerAnimation(false);
    }

  return (
    <SettingContext.Provider value={{ startTimerAnimation, startTimer, pauseTimer, stopTimer, saveSettings, timerSettings }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider