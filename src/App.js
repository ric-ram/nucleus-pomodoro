import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './components/Home';
import LogRegister from './components/LogRegister/LogRegister';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="signup" element={<LogRegister isSignUp={true} />} />
        <Route exact path="login" element={<LogRegister isSignUp={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
