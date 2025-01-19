import React from 'react';
import { Layout, Dropdown, Space, Typography, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import logo from "./../assets/images/logo.png"; 

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHead() {
  // Define the user menu dropdown
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="logout">
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
