import { useState, useEffect } from "react";
import { Row, Col, Progress, Tabs, Typography, Card, Tooltip, Space, message } from "antd";

import { homeDetails } from "../../Api/Home";

const { Title, Paragraph } = Typography;

export default function Services() {
  const [data, setData] = useState({ services: [] });
  const [progress, setProgress] = useState({
    webDevelopment: 0,
    graphicsDesigning: 0,
    webDesigning: 0,
    appDevelopment: 0,
    seo: 0,
  });

  // Fetch API Data
  useEffect(() => {
    const fetchPagesDetails = async () => {
      try {
        const response = await homeDetails();
        const result = await response.json();
        console.log("API Response:", result); // Debugging log

        // Ensure the API response structure matches the expected format
        if (result?.servicespage) {
          setData({ services: result.servicespage });
        } else {
          message.error("Invalid API response format");
        }
      } catch (error) {
        message.error("Failed to fetch data");
        console.error("Fetch error:", error);
      }
    };
    fetchPagesDetails();
  }, []);

  // Simulate skill progress animation
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

  // Skills Progress Data
  const skills = [
    { title: "Web Development", percent: progress.webDevelopment, color: "#4CAF50" },
    { title: "Graphics Designing", percent: progress.graphicsDesigning, color: "#FF9800" },
    { title: "Web Designing", percent: progress.webDesigning, color: "#03A9F4" },
    { title: "App Development", percent: progress.appDevelopment, color: "#F44336" },
    { title: "SEO", percent: progress.seo, color: "#2196F3" },
  ];

  
  
  // Generate Tab Items
  const tabItems = data.services.map((service, index) => ({
    key: `${index + 1}`,
    label: (
      <Tooltip title={service.title} overlayStyle={{ fontSize: "20px" }}>

{service.image && (
  <img 
    src={`http://localhost:5000/api/img/${service._id}`} 
    alt={service.title} 
    width="100" 
    height="100" 
    style={{
      borderRadius: "50%",
      border: "2px solid #1890ff",
      display: "inline-block", // Ensures no extra space around image
      verticalAlign: "middle", // Aligns image with text properly
      margin: "0", // Removes unwanted margin
      padding: "0" // Removes extra padding
    }}
  />
)}


      </Tooltip>
    ),
    children: (
      <>
        <Title level={3} style={{ marginBottom: 0 }}>{service.title}</Title>
        <Paragraph style={{ marginTop: 0, fontSize: "16px" }}>{service.description}</Paragraph>
        
      </>
    ),
  }));

  return (
    <section id="services" style={{ padding: '60px' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>Our Skills & Services</Title>
      <Row gutter={[10, 10]}>
        {/* Skills Progress */}
        <Col xs={24} md={8}>
          <Card bordered hoverable>
            <Title level={3} style={{ marginBottom: "10px" }}>What We Are Good At</Title>
            <Space direction="vertical" style={{ width: "100%", gap: "0px" }}>
              {skills.map((skill, index) => (
                <div key={index} style={{ marginBottom: "8px", lineHeight: "0.5" }}>
                  <Paragraph style={{ fontSize: "20px", marginBottom: "10px", lineHeight: "1.5" }}>
                    {skill.title}
                  </Paragraph>
                  <Progress 
                    percent={skill.percent} 
                    strokeColor={skill.color} 
                    status="active" 
                    format={() => `${skill.percent}%`} 
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Services Tabs */}
        <Col xs={24} md={16}>
          <Card bordered hoverable>
            <Tabs defaultActiveKey="1" items={tabItems} />
          </Card>
        </Col>
      </Row>
    </section>
  );
}
