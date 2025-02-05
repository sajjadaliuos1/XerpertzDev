import { Layout, Dropdown, Space, Typography, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

import logo from "./../assets/images/logo.png";

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHead() {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Logout function - moved above the return statement
  const handleLogout = () => {
    // Clear user data from local/session storage (if necessary)
    localStorage.removeItem('user'); // Example of clearing user data from localStorage

    // Redirect to the login page (or home page)
    navigate('/login'); // Use navigate to redirect to login page

    // Optional: You can also call an API to log out the user from the server.
  };

  // Define the user menu dropdown
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {/* Header */}
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo Section */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '5px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
          </div>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: '10px' }}>My Application</Text>
        </div>

        {/* User Profile Dropdown */}
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Space style={{ color: '#fff', cursor: 'pointer' }}>
            <UserOutlined />
            Profile
          </Space>
        </Dropdown>
      </Header>
    </div>
  );
}
