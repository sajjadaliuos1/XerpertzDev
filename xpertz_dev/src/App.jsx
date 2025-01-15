import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LayOut_dev from './components/LayOut';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LayOut_dev />} />
      </Routes>
    </Router>
  );
}

export default App;
