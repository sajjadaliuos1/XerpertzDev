import React from 'react';
import { Row, Col, Progress, Tabs, Typography, Card } from 'antd'; // Importing Ant Design components
import { FaGlobe, FaImage, FaCalendarAlt, FaSearch, FaAndroid } from 'react-icons/fa'; // For icons

const { Title, Paragraph } = Typography;

export default function Services_xpertzdev() {
  return (
    // Service Section
    <section id="service" style={{ padding: "60px 0", backgroundColor: "#f4f4f4" }}>
      <div className="container">
        {/* Title */}
        <Title level={2} style={{ textAlign: "center" }}>
          Our Skills & Services
        </Title>

        <div className="service_wrapper">
          <Row gutter={[16, 16]}>
            {/* Skills Section - Left */}
            <Col xs={24} sm={8} md={6}>
              <Card title="What we are good at:" bordered={false} style={{ height: "100%" }}>
                {/* Progress Bars */}
                <Progress
                  percent={100}
                  status="active"
                  strokeColor="#4CAF50"
                 
                />
                <Paragraph style={{fontSize:"10px"}}>Web Development</Paragraph>

                <Progress
                  percent={100}
                  status="active"
                  strokeColor="#FF9800"
            
                />
                <Paragraph style={{fontSize:"10px"}}>Graphics Designing</Paragraph>

                <Progress
                  percent={100}
                  status="normal"
                  strokeColor="#03A9F4"
                 
                />
                <Paragraph style={{fontSize:"10px"}}>Web Designing</Paragraph>

                <Progress
                  percent={100}
                  status="active"
                  strokeColor="#F44336"
                  
                />
                <Paragraph style={{fontSize:"10px"}}>App Development</Paragraph>

                <Progress
                  percent={100}
                  status="active"
                  strokeColor="#2196F3"
                 
                />
                <Paragraph style={{fontSize:"10px"}}>SEO</Paragraph>
              </Card>
            </Col>

            {/* Tabs Section - Right */}
            <Col xs={24} sm={16} md={18}>
              <Card bordered={false} >
                <Tabs defaultActiveKey="1" style={{ color: "black",
                 }} items={[
                  {
                    key: "1",
                    label: (
                      <span>
                        <FaGlobe />
                        Web Development
                      </span>
                    ),
                    children: (
                      <>
                        <Title level={5}>Web Development</Title>
                        <Paragraph style={{fontSize:"8"}}>
                          If your website is more than just a static informational page, you need the skills of a programmer who knows how to bring your website to life. Interactive features, embedded applications, and database requests all require specialized programming skills.
                        </Paragraph>
                      </>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <span>
                        <FaImage />
                        Web Designing
                      </span>
                    ),
                    children: (
                      <>
                        <Title level={5}>Web Designing</Title>
                        <Paragraph>
                          Effective web design is more than just a few pretty graphics. It needs to be carefully planned for optimal layout to improve functionality and enhance user experience.
                        </Paragraph>
                      </>
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <span>
                        <FaCalendarAlt />
                        Graphic Designing
                      </span>
                    ),
                    children: (
                      <>
                        <Title level={5}>Graphic Designing</Title>
                        <Paragraph>
                          Graphics Design plays a critical role in market perception. Good design makes your business stand out, leaving a lasting impression on your customers and audience.
                        </Paragraph>
                      </>
                    ),
                  },
                  {
                    key: "4",
                    label: (
                      <span>
                        <FaSearch />
                        SEO
                      </span>
                    ),
                    children: (
                      <>
                        <Title level={5}>SEO</Title>
                        <Paragraph>
                          SEO (Search Engine Optimization) is an effective marketing tool that can boost your traffic, enhance visibility, and improve your rankings in search engines, driving more qualified visitors to your site.
                        </Paragraph>
                      </>
                    ),
                  },
                  {
                    key: "5",
                    label: (
                      <span>
                        <FaAndroid />
                        App Development
                      </span>
                    ),
                    children: (
                      <>
                        <Title level={5}>App Development</Title>
                        <Paragraph>
                          Our team is proficient in developing iOS and Android apps that enhance user experience and fulfill business requirements. We create apps that are functional, scalable, and user-friendly.
                        </Paragraph>
                      </>
                    ),
                  },
                ]}/>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
