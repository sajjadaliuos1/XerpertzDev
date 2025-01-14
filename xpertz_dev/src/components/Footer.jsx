import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function Foot() {
  return (
    <Footer
      className="footer_wrapper"
      id="contact"
      style={{
        padding: '70px 0',
        backgroundColor: '#000', // Black background
        color: '#fff', // White text
      }}
    >
      <div className="container">
        <section
          className="page_section contact"
          id="contact"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            color: '#fff',
          }}
        >
          <div className="contact-item">
            <div className="contact-address">
              <i className="ion-ios-location-outline"></i>
              <h1>Address</h1>
              <p>
                Office No. 1, 2nd Floor,<br/>
                 Ali Plaza New Madyan Road,<br/>
                  Mingora
                Swat.
              </p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-phone">
              <i className="ion-ios-telephone-outline"></i>
              <h1>Call us</h1>
              <p>
                +92 333 9471086 <br /> 0946-811722
              </p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-email">
              <i className="ion-ios-email-outline"></i>
              <h1>Emails</h1>
              <p>info@xpertzdev.com</p>
            </div>
          </div>
          
        </section>
      </div>
      <div className="container">
        <div className="footer_bottom" style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>Copyright © 2019. Xpertz Dev</span>
        </div>
      </div>
    </Footer>
  );
}
