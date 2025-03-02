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
    navigate("/logout"); // Navigate to Logout component
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
