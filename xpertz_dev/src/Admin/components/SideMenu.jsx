import React, { useState } from 'react';
import {
  DashboardOutlined,
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
  IdcardOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';

const { Sider } = Layout;

const SideMenu = ({ onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { key: 'Dashboard', icon: <DashboardOutlined />, label: 'Dashboard' }, // New Dashboard menu item
    { key: 'AdHome', icon: <HomeOutlined />, label: 'Pages' },
    { key: 'About', icon: <InfoCircleOutlined />, label: 'About Us' },
    { key: 'Setting', icon: <SettingOutlined />, label: 'Setting' },
    { key: 'logout', icon: <AppstoreAddOutlined />, label: 'Logout' },
    
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
     
    >
      <Menu
      style={{height:"500px"}}
        mode="inline"
        defaultSelectedKeys={['Dashboard']} // Set "Dashboard" as the default active item
        items={sidebarItems}
        onClick={(menu) => onMenuClick(menu.key)} // Notify parent about selected item
      />
    </Sider>
  );
};

export default SideMenu;
