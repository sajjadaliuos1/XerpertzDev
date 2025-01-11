import React from 'react';
import { Typography, Row, Col } from 'antd'; // Importing Ant Design components

import download from "../../assets/images/download.png";
const { Title, Paragraph } = Typography;

export default function About_xpertzdev() {
  return (
    // Hero Section
    <section id="aboutUs" style={{ color: "black", padding: "60px 0" }}>
      <div className="inner_wrapper">
        <div className="container">
          {/* Title */}
          <Title level={2} style={{ textAlign: "center" }}>
            About Us
          </Title>

          {/* Inner Section */}
          <div className="inner_section">
            <Row gutter={[16, 16]} align="middle">
              {/* Text Section - Left */}
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{ textAlign: "left", padding: "40px",  marginBottom: "40px" , fontSize: "8px" }} // Adjusted font size
              >
                 <p><strong>Xpertz Dev IT Solution</strong> is an emerging IT Company which mainly provide Software as a Service.</p>
                 <p>Among a plethora of services, Web Design and Development, E-Commerce Solution, Domain / Hosting, Business SMS are few that we offer. </p>
              </Col>

              {/* Image Section - Right */}
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px",
                }}
              >
                <img
                  src={download}
                  alt="Xpertz Dev"
                  style={{ width: "80%", borderRadius: "10px" }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
