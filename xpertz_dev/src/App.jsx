import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import LayOut_dev from './components/LayOut';

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route with "*" to handle all nested routes */}
        <Route path="*" element={<LayOut_dev />} />
      </Routes>
    </Router>
  );
}

export default App;
