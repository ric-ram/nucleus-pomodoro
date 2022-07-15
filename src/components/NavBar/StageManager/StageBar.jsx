import { Tab, Tabs } from 'react-bootstrap';

import { SettingContext } from '../../../context/SettingsContext';
import { useContext } from 'react';

function Bar({ timerSettings, saveSettings }) {

  const { pauseTimer } = useContext(SettingContext);

  return (
    <Tabs
      id="stages-bar"
      activeKey={timerSettings.active_state}
      onSelect={(k) => {
        if (k !== timerSettings.active_state) {
          pauseTimer();
        }
        saveSettings({
          ...timerSettings, 
          active_state: k
        });
      }}
      className="stage-placeholder"
    >
      <Tab tabClassName={`stage-btn${timerSettings.active_state === 'work' ? " active-stage-btn" : ""}`} eventKey="work" title="Work">

      </Tab>
      <Tab tabClassName={`stage-btn${timerSettings.active_state === 'short-break' ? " active-stage-btn" : ""}`} eventKey="short-break" title="Short Break">

      </Tab>
      <Tab tabClassName={`stage-btn${timerSettings.active_state === 'long-break' ? " active-stage-btn" : ""}`} eventKey="long-break" title="Long Break">

      </Tab>
    </Tabs>
  );
}

const StageBar = ({ timerSettings, saveSettings }) => {
  return (
    <Bar timerSettings={timerSettings} saveSettings={saveSettings} />
  )
}

export default StageBar