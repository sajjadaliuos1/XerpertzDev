import React from 'react';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Foot from './Footer';
import Head from './Header';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import Services from './Pages/Services';



export default function LayOut_dev() {
  
  return (
    <Layout>
     <Head/>
      <Home/>
       <AboutUs/>
        <Services/>
   <Foot/>
    </Layout>
  );
}
