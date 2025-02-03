import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Space, Divider, Statistic } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function Foot() {
  const [visitorCount, setVisitorCount] = useState(5000); // Initial visitor count

  useEffect(() => {
    // Simulate visitor count incrementing
    const interval = setInterval(() => {
      setVisitorCount((prevCount) => prevCount + 1); // Increment visitor count
    }, 5000); // Update every 5 seconds (for demo purposes)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Footer
      style={{
        backgroundColor: '#001529',
        color: '#fff',
        padding: '30px',
      }}
    >
      <div>
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
                <UserOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={4} style={{ color: '#fff' }}>Visitors</Title>
                <Statistic
                  value={visitorCount}
                  valueStyle={{
                    fontSize: '20px',
                    color: '#fff',
                  }}
                />
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
