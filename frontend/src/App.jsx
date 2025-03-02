import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayOut_dev from './components/LayOut';
import Login from "./Admin/components/Login";
import Dashboard from './Admin/components/Dashboard';
import ProtectedRoute from './Admin/components/ProtectedRoute';
import Signup from './Admin/components/SignUp';
import Pagesdetails from './Admin/components/Pagesdetails';
import UserDetails from './Admin/components/userdetails';
import PagesModel from './Admin/components/PagesModel';
import Logout from './Admin/components/Logout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LayOut_dev />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        {/* 🔒 Protected Routes - Only for Authenticated Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pagemodel" element={<PagesModel />} />
          <Route path="/pagedetails" element={<Pagesdetails />} />
          <Route path="/user" element={<UserDetails />} />
        </Route>

        {/* Redirect unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
