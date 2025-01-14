import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom'; 
import Foot from './Footer';
import Head from './Header';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import Services from './Pages/Services';
import Business from './Pages/Business';
import DomainHosting from './Pages/DomainHosting';
import Teams from './Pages/Teams';
import Clients from './Pages/Clients';
import Portfolio from './Pages/portfolio';

export default function LayOut_dev() {
  return (
    <Layout>
      <Head />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/business" element={<Business />} />
        <Route path="/domain" element={<DomainHosting />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
      <br/>
      <Foot />
    </Layout>
  );
}
