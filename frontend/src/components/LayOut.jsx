
import { Layout } from 'antd';

import Head from './Header';
import Foot from './Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import Services from './Pages/Services';
import Business from './Pages/Business';
import DomainHosting from './Pages/DomainHosting';
import Teams from './Pages/Teams';
import Clients from './Pages/Clients';
import Portfolio from './Pages/portfolio';

const { Content } = Layout;

export default function LayOut_dev() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header stays fixed */}
      <Head />

      {/* Content section with all routes */}
      <Content>
        <Home />
        <AboutUs />
        <Services />
        <Portfolio />
        <DomainHosting />
        <Business />
        <Teams />
        <Clients />
      </Content>

      {/* Footer at the bottom of the page */}
      <Foot />
    </Layout>
  );
}
