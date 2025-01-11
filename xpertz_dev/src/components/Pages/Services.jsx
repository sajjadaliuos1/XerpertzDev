import React, { useState, useEffect } from "react";
import { Row, Col, Progress, Tabs, Typography, Card, Tooltip, Space } from "antd";
import { FaGlobe, FaImage, FaCalendarAlt, FaSearch, FaAndroid } from "react-icons/fa";

const { Title, Paragraph } = Typography;

export default function Services() {
  const [progress, setProgress] = useState({
    webDevelopment: 0,
    graphicsDesigning: 0,
    webDesigning: 0,
    appDevelopment: 0,
    seo: 0,
  });

  useEffect(() => {
    const interval = setTimeout(() => {
      setProgress({
        webDevelopment: 100,
        graphicsDesigning: 100,
        webDesigning: 100,
        appDevelopment: 100,
        seo: 100,
      });
    }, 500);

    return () => clearTimeout(interval);
  }, []);

  const skills = [
    { title: "Web Development", percent: progress.webDevelopment, color: "#4CAF50" },
    { title: "Graphics Designing", percent: progress.graphicsDesigning, color: "#FF9800" },
    { title: "Web Designing", percent: progress.webDesigning, color: "#03A9F4" },
    { title: "App Development", percent: progress.appDevelopment, color: "#F44336" },
    { title: "SEO", percent: progress.seo, color: "#2196F3" },
  ];

  const tabItems = [
    {
      key: "1",
      label: (
        <Tooltip title="Web Development">
          <FaGlobe style={{ fontSize: "24px" }} />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={4}>Web Development</Title>
          <Paragraph>
            If your website is more than just a static informational page, you need skills to bring it to life. We create
            dynamic, functional websites that deliver seamless user experiences.
          </Paragraph>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <Tooltip title="Web Designing">
          <FaImage style={{ fontSize: "24px" }} />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={4}>Web Designing</Title>
          <Paragraph>
            Effective web design combines aesthetics and usability. We ensure optimal layouts that enhance user experience
            and functionality.
          </Paragraph>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <Tooltip title="Graphic Designing">
          <FaCalendarAlt style={{ fontSize: "24px" }} />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={4}>Graphic Designing</Title>
          <Paragraph>
            Our designs leave lasting impressions. From branding to marketing, we craft designs that captivate and
            communicate.
          </Paragraph>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <Tooltip title="SEO">
          <FaSearch style={{ fontSize: "24px" }} />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={4}>SEO</Title>
          <Paragraph>
            SEO is essential for visibility. We boost your search rankings, increase traffic, and drive more qualified
            visitors to your site.
          </Paragraph>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <Tooltip title="App Development">
          <FaAndroid style={{ fontSize: "24px" }} />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={4}>App Development</Title>
          <Paragraph>
            We create iOS and Android apps that are functional, scalable, and user-friendly, delivering exceptional user
            experiences.
          </Paragraph>
        </>
      ),
    },
  ];

  return (
    <section id="service">
      <div className="container">
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
          Our Skills & Services
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card bordered hoverable>
              <Title level={5}>What We Are Good At</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {skills.map((skill, index) => (
                  <div key={index}>
                    <Paragraph style={{fontSize:"12px"}} >{skill.title}</Paragraph>
                    <Progress
                      percent={skill.percent}
                      strokeColor={skill.color}
                      status="active"
                      showInfo={false}
                    />
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card bordered hoverable>
              <Tabs defaultActiveKey="1" items={tabItems} />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
