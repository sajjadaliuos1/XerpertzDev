import React, { useState } from 'react';
import {
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  GlobalOutlined,
  MessageOutlined,
  TeamOutlined,
  PhoneOutlined,
  IdcardOutlined, // Add an icon for clients
} from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space, Typography } from 'antd';
import logo from "../assets/images/logo.png";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const SideMenu = () => {
  // State for responsive sidebar toggle
  const [collapsed, setCollapsed] = useState(false);

  // Define the sidebar menu items
  const sidebarItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Home' },
    { key: '2', icon: <InfoCircleOutlined />, label: 'About Us' },
    { key: '3', icon: <SettingOutlined />, label: 'Services' },
    { key: '4', icon: <AppstoreAddOutlined />, label: 'Portfolio' },
    { key: '5', icon: <GlobalOutlined />, label: 'Domains/Hosting' },
    { key: '6', icon: <MessageOutlined />, label: 'Business SMS' },
    { key: '7', icon: <TeamOutlined />, label: 'Team' },
    { key: '8', icon: <IdcardOutlined />, label: 'Our Clients' }, // New Menu Item
    { key: '9', icon: <PhoneOutlined />, label: 'Contact' },
  ];

  // User profile dropdown menu
  const userMenu = (
    <Menu
      items={[
        { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
        { key: 'logout', label: 'Logout', icon: <LogoutOutlined /> },
      ]}
    />
  );

  // Use Ant Design's theme for dynamic styling
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* Header with logo and user profile */}
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo Section with White Background */}
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '5px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
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

      {/* Layout with Sidebar and Main Content */}
      <Layout style={{ minHeight: '100vh' }}>
        {/* Sidebar with responsive toggle */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={sidebarItems}
          />
        </Sider>

        {/* Main Content Area */}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Main Content Area
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideMenu;
