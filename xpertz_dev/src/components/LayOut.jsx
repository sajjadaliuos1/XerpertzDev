import React from 'react';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Footer_dev from './Footer';
import Header_dev from './Header';
import Home_xpertzdev from './Pages/Home';
import About_xpertzdev from './Pages/About';
import Services_xpertzdev from './Pages/Services';



export default function LayOut_dev() {
  
  return (
    <Layout>
     <Header_dev/>
      <Home_xpertzdev/>
       <About_xpertzdev/>
        <Services_xpertzdev/>
   <Footer_dev/>
    </Layout>
  );
}
