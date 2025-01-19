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
  IdcardOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { key: '/Adminhome', icon: <HomeOutlined />, label: 'Home' },
    { key: '/about', icon: <InfoCircleOutlined />, label: 'About Us' },
    { key: '/services', icon: <SettingOutlined />, label: 'Services' },
    { key: '/portfolio', icon: <AppstoreAddOutlined />, label: 'Portfolio' },
    { key: '/domains', icon: <GlobalOutlined />, label: 'Domains/Hosting' },
    { key: '/business-sms', icon: <MessageOutlined />, label: 'Business SMS' },
    { key: '/team', icon: <TeamOutlined />, label: 'Team' },
    { key: '/clients', icon: <IdcardOutlined />, label: 'Our Clients' },
    { key: '/contact', icon: <PhoneOutlined />, label: 'Contact' },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['/Adminhome']}
        items={sidebarItems}
        onClick={(menu) => navigate(menu.key)}
      />
    </Sider>
  );
};

export default SideMenu;
