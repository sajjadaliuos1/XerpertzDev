import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'; // For nested routes
import SideMenu from './SideMenu';
import AdminHead from '../AdminHead';
import AdminHome from './AdminHome';

const { Sider, Content, Header } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ background: '#001529', color: '#fff', padding: '0 20px' }}>
        <AdminHead />
      </Header>

      {/* Body */}
      <Layout>
        {/* Sidebar */}
        <Sider width={200} style={{ background: '#fff' }}>
          <SideMenu />
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              margin: 0,
              background: '#fff',
              padding: 24,
              minHeight: '280px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <AdminHome /> {/* Render nested route components here */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
