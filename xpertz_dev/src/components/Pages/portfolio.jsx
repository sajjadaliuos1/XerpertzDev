import React from 'react';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { GithubOutlined, LinkOutlined, AppstoreAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const portfolioData = [
  {
    title: 'Project 1',
    description: 'This is a brief description of Project 1.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project1',
    liveDemo: 'https://yourwebsite.com/project1',
  },
  {
    title: 'Project 2',
    description: 'This is a brief description of Project 2.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project2',
    liveDemo: 'https://yourwebsite.com/project2',
  },
  {
    title: 'Project 3',
    description: 'This is a brief description of Project 3.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project3',
    liveDemo: 'https://yourwebsite.com/project3',
  },
  {
    title: 'Project 4',
    description: 'This is a brief description of Project 4.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project4',
    liveDemo: 'https://yourwebsite.com/project4',
  },
  {
    title: 'Project 5',
    description: 'This is a brief description of Project 5.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project5',
    liveDemo: 'https://yourwebsite.com/project5',
  },
  {
    title: 'Project 6',
    description: 'This is a brief description of Project 6.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project6',
    liveDemo: 'https://yourwebsite.com/project6',
  },
  {
    title: 'Project 6',
    description: 'This is a brief description of Project 6.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project6',
    liveDemo: 'https://yourwebsite.com/project6',
  },
  {
    title: 'Project 6',
    description: 'This is a brief description of Project 6.',
    icon: <AppstoreAddOutlined style={{ fontSize: '50px', color: '#1890ff' }} />,
    github: 'https://github.com/yourusername/project6',
    liveDemo: 'https://yourwebsite.com/project6',
  },
];

export default function Portfolio() {
  return (
    <Layout id='portfolio' style={{ padding: '70px', backgroundColor: '#f0f2f5' }}>
      <div className="container">
        <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
          My Portfolio
        </Title>
        <Row gutter={[32, 32]} justify="center">
          {portfolioData.map((project, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  backgroundColor: '#ffffff',
                  border: '2px solid #1890ff', // Blue border added
                }}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                }}
                cover={
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                    {project.icon}
                  </div>
                }
                actions={[
                  <Button
                    type="link"
                    icon={<GithubOutlined />}
                    href={project.github}
                    target="_blank"
                    style={{
                      color: '#1890ff',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginLeft: '10px',
                    }}
                  >
                    GitHub
                  </Button>,
                  <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href={project.liveDemo}
                    target="_blank"
                    style={{
                      color: '#1890ff',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginLeft: '10px',
                    }}
                  >
                    Live Demo
                  </Button>,
                ]}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Card.Meta
                  title={project.title}
                  description={
                    <Paragraph ellipsis={{ rows: 3 }} style={{ color: '#555', fontSize: '20px', lineHeight: '1.5' }}>
                      {project.description}
                    </Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
}
