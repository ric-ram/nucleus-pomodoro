import { Tab, Tabs } from 'react-bootstrap';

import { useState } from 'react';

function Bar() {
  const [key, setKey] = useState('work');

  return (
    <Tabs
      id="stages-bar"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="stage-placeholder"
    >
      <Tab tabClassName={`stage-btn${key === 'work' ? " active-stage-btn" : ""}`} eventKey="work" title="Work">

      </Tab>
      <Tab tabClassName={`stage-btn${key === 'short-break' ? " active-stage-btn" : ""}`} eventKey="short-break" title="Short Break">

      </Tab>
      <Tab tabClassName={`stage-btn${key === 'long-break' ? " active-stage-btn" : ""}`} eventKey="long-break" title="Long Break">

      </Tab>
    </Tabs>
  );
}

const StageBar = () => {
  return (
    <Bar />
  )
}

export default StageBar