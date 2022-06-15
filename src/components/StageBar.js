import { Tab, Tabs } from 'react-bootstrap';

function Bar({ timerSettings, saveSettings }) {
  console.log(timerSettings.active)
  return (
    <Tabs
      id="stages-bar"
      activeKey={timerSettings.active}
      onSelect={(k) => saveSettings({
        ...timerSettings, 
        active: k
      })}
      className="stage-placeholder"
    >
      <Tab tabClassName={`stage-btn${timerSettings.active === 'work' ? " active-stage-btn" : ""}`} eventKey="work" title="Work">

      </Tab>
      <Tab tabClassName={`stage-btn${timerSettings.active === 'short-break' ? " active-stage-btn" : ""}`} eventKey="short-break" title="Short Break">

      </Tab>
      <Tab tabClassName={`stage-btn${timerSettings.active === 'long-break' ? " active-stage-btn" : ""}`} eventKey="long-break" title="Long Break">

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