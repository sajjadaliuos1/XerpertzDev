import React, { useState } from 'react';
import { Layout } from 'antd';
import AdminHead from '../AdminHead';
import SideMenu from './SideMenu';
import AdHome from './AdHome';
import AdDashboard from './AdDashboard';

const { Content, Header } = Layout;

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('AdDashboard'); // Default component

  const renderContent = () => {
    switch (activeComponent) {
      case 'AdHome':
        return <AdHome />;
      case 'About':
        return <div>About Us Content</div>; // Replace with the About component
      case 'Services':
        return <div>Services Content</div>; // Replace with the Services component
      case 'Portfolio':
        return <div>Portfolio Content</div>; // Replace with the Portfolio component
      case 'Domains':
        return <div>Domains/Hosting Content</div>; // Replace with the Domains component
      case 'BusinessSMS':
        return <div>Business SMS Content</div>; // Replace with the Business SMS component
      case 'Team':
        return <div>Team Content</div>; // Replace with the Team component
      case 'Clients':
        return <div>Our Clients Content</div>; // Replace with the Clients component
      case 'Contact':
        return <div>Contact Content</div>; // Replace with the Contact component
      default:
        return <AdDashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ background: '#001529', color: '#fff', padding: '0 20px' }}>
        <AdminHead />
      </Header>

      {/* Body */}
      <Layout>
        {/* Sidebar */}
        <SideMenu onMenuClick={setActiveComponent} />

        {/* Main Content */}
        <Layout style={{ padding: '24px' }}>
          <Content>
            {renderContent()} {/* Render active content */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
