import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import ActionMenu from './components/Timer/ActionMenu';
import Home from './components/Home';
import LogRegister from './components/LogRegister/LogRegister';
import NavigationBar from './components/NavBar/NavigationBar';
import { SettingContext } from './context/SettingsContext';
import TaskTextButton from './components/NavBar/ProjectManager/TaskTextButton';
import Timer from './components/Timer/Timer';

function App() {

  const { currentTime, startTimerAnimation, stopTimer, timerSettings, saveSettings, time, timerKey, currentTask, isSignUp, setIsSignUp } = useContext(SettingContext);
  
  // useEffect(() => {saveSettings(timerSettings)}, [timerSettings, stopTimer])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="signup" element={<LogRegister isSignUp={isSignUp} setIsSignUp={setIsSignUp} />} />
        <Route exact path="login" element={<LogRegister isSignUp={!isSignUp} setIsSignUp={setIsSignUp} />} />
      </Routes>
    </Router>
  );
}

export default App;
