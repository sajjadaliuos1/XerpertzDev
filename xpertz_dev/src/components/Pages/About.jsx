import React from 'react';
import { Typography, Row, Col, Image } from 'antd';

import download from "../../assets/images/download.png";
const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
    // Hero Section
    <section id="aboutUs">
      <div className="container">
        {/* Title */}
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          About Us
        </Title>

        {/* Inner Section */}
        <Row gutter={[16, 16]} align="middle">
          {/* Text Section - Left */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <div style={{ padding: 20, backgroundColor: '#f7f7f7', borderRadius: 10 }}>
              <Title level={4}>Our Mission</Title>
              <Paragraph>
                <strong>Xpertz Dev IT Solution</strong> is an emerging IT Company which mainly provide Software as a Service.
              </Paragraph>
              <Paragraph>
                Among a plethora of services, Web Design and Development, E-Commerce Solution, Domain / Hosting, Business SMS are few that we offer.
              </Paragraph>
            </div>
          </Col>

          {/* Image Section - Right */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Image
              src={download}
              alt="Xpertz Dev"
              style={{ width: '100%', borderRadius: 10 }}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}