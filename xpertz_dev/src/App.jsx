import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayOut_dev from './components/LayOut';
import Login from "./Admin/components/Login";
import Dashboard from './Admin/components/Dashboard';
import AdminHome from './Admin/components/AdminHome';
function App() {
  return (
    <Router>
      <Routes>
        {/* Define the admin route first to ensure it gets matched */}
        <Route path="/admin" element={<Login />} />
        {/* Catch all other routes */}
        <Route path="*" element={<LayOut_dev />} />
        <Route path="dashboard" element={<Dashboard/>} />
        
        <Route path="Adminhome" element={<AdminHome/>} />
      </Routes>
    </Router>
  );
}

export default App;
