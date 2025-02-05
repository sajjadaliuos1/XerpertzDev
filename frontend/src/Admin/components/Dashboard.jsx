import  { useState } from 'react';
import { Layout } from 'antd';
import AdminHead from '../AdminHead';
import SideMenu from './SideMenu';
import AdDashboard from './AdDashboard';
import UserDetails from './userdetails';
import Pagesdetails from './Pagesdetails';


const { Content, Header } = Layout;

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('AdDashboard'); // Default component

  const renderContent = () => {
    switch (activeComponent) {
      case 'pagedetails':
        return <Pagesdetails />;
      case 'About':
        return <div>About Us Content</div>; // Replace with the About component
      case 'User':
        return <UserDetails/>; 
       
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
