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
        <Tooltip title="Web Development" overlayStyle={{ fontSize: "16px" }}>
          <FaGlobe
            style={{
              fontSize: "40px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #1890ff",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={5} style={{ marginBottom: 0 }}>Web Development</Title>
          <Paragraph style={{ marginTop: 0, fontSize: "12px" }}>
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
          <FaImage
            style={{
              fontSize: "40px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #1890ff",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={5} style={{ marginBottom: 0 }}>Web Designing</Title>
          <Paragraph style={{ marginTop: 0, fontSize: "12px" }}>
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
          <FaCalendarAlt
            style={{
              fontSize: "40px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #1890ff",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={5} style={{ marginBottom: 0 }}>Graphic Designing</Title>
          <Paragraph style={{ marginTop: 0, fontSize: "12px" }}>
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
          <FaSearch
            style={{
              fontSize: "40px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #1890ff",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={5} style={{ marginBottom: 0 }}>SEO</Title>
          <Paragraph style={{ marginTop: 0, fontSize: "12px" }}>
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
          <FaAndroid
            style={{
              fontSize: "40px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #1890ff",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      ),
      children: (
        <>
          <Title level={5} style={{ marginBottom: 0 }}>App Development</Title>
          <Paragraph style={{ marginTop: 0, fontSize: "12px" }}>
            We create iOS and Android apps that are functional, scalable, and user-friendly, delivering exceptional user
            experiences.
          </Paragraph>
        </>
      ),
    },
  ];

  return (
    <section id="service" style={{ padding: '40px' }}>
      <div className="container">
        <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>
          Our Skills & Services
        </Title>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Card bordered hoverable>
              <Title level={5} style={{ marginBottom: "10px" }}>What We Are Good At</Title>
              <Space direction="vertical" style={{ width: "100%", gap: "2px" }}>
                {skills.map((skill, index) => (
                  <div key={index} style={{ marginBottom: "8px", lineHeight: "0.5" }}>
                    <Paragraph style={{ fontSize: "10px", marginBottom: "-5px", lineHeight: "0.5" }}>
                      {skill.title}
                    </Paragraph>
                    <Progress
                      percent={skill.percent}
                      strokeColor={skill.color}
                      status="active"
                      format={() => `${skill.percent}%`}  // This line displays the percentage value
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
