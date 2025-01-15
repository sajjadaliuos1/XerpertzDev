import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function Foot() {
  return (
    <Footer
      style={{
        backgroundColor: '#001529',
        color: '#fff',
        padding: '50px 0',
      }}
    >
      <div className="container">
        <section id="contact">
          <Title level={2} style={{ textAlign: 'center', color: '#fff' }}>
            Contact Us
          </Title>

          <Row gutter={[16, 16]} justify="space-around">
            {/* Address Section */}
            <Col xs={24} sm={8} md={6}>
              <div style={{ textAlign: 'center' }}>
                <EnvironmentOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={4} style={{ color: '#fff' }}>Address</Title>
                <Text style={{ fontSize: '16px', color: '#fff' }}>
                  Office No. 1, 2nd Floor, Ali Plaza New Madyan Road, Mingora Swat.
                </Text>
              </div>
            </Col>

            {/* Call Us Section */}
            <Col xs={24} sm={8} md={6}>
              <div style={{ textAlign: 'center' }}>
                <PhoneOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={4} style={{ color: '#fff' }}>Call Us</Title>
                <Text style={{ fontSize: '16px', color: '#fff' }}>
                  +92 333 9471086 <br /> 0946-811722
                </Text>
              </div>
            </Col>

            {/* Emails Section */}
            <Col xs={24} sm={8} md={6}>
              <div style={{ textAlign: 'center' }}>
                <MailOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={4} style={{ color: '#fff' }}>Emails</Title>
                <Text style={{ fontSize: '16px', color: '#fff' }}>
                  info@xpertzdev.com
                </Text>
              </div>
            </Col>

            {/* Visitors Counter Section */}
            <Col xs={24} sm={8} md={6}>
              <div style={{ textAlign: 'center' }}>
                <Title level={4} style={{ color: '#fff' }}>Visitors Counter</Title>
                <a href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://hitwebcounter.com/counter/counter.php?page=7227526&style=0050&nbdigits=5&type=ip&initCount=5000"
                    title="User Stats"
                    alt="PHP Hits Count"
                    style={{ border: '0', width: '100%' }}
                  />
                </a>
              </div>
            </Col>
          </Row>
        </section>

        <Divider style={{ borderColor: '#444' }} />

        <div style={{ textAlign: 'center' }}>
          <Text style={{ color: '#fff' }}>
            Copyright © 2019. Xpertz Dev
          </Text>
        </div>
      </div>
    </Footer>
  );
}
