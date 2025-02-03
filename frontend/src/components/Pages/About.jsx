import React from 'react';
import { Typography, Row, Col, Image } from 'antd';
import download from "../../assets/images/download.png";
const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
    // Hero Section
    <section id="aboutUs" style={{ paddingTop: '60px' }}> {/* Added paddingTop */}
    
        {/* Title */}
        <Title level={2} style={{ textAlign: 'center', color: '#1890ff'}}>
          About Us
        </Title>

        {/* Inner Section */}
        <Row gutter={[16, 16]} align="middle">
          {/* Text Section - Left */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <div style={{ padding: 10, backgroundColor: '#f7f7f7', borderRadius: 10 }}>
              <Title level={4} style={{ marginBottom: '10px' }}>Our Mission</Title>
              <Paragraph style={{ marginBottom: '10px', fontSize: "18px" }}>
                <strong>Xpertz Dev IT Solution</strong> is an emerging IT Company which mainly provides Software as a Service.
              </Paragraph>
              <Paragraph style={{ marginBottom: 0, fontSize: "18px" }}>
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
     
    </section>
  );
}
