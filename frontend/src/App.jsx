
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayOut_dev from './components/LayOut';
import Login from "./Admin/components/Login";
import Dashboard from './Admin/components/Dashboard';

import Signup from './Admin/components/SignUp';
import Pagesdetails from './Admin/components/Pagesdetails';
import UserDetails from './Admin/components/userdetails';
import PagesModel from './Admin/components/PagesModel';


function App() {
  return (
    <Router>
      <Routes>
        {/* Define the admin route first to ensure it gets matched */}
        <Route path="/admin" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        
        
        {/* Catch all other routes */}
        <Route path="*" element={<LayOut_dev />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="pagemodel" element={<PagesModel/>} />
        <Route path="pagedetails" element={<Pagesdetails/>} />
        <Route path="User" element={<UserDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
