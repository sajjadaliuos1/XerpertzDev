import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Tooltip, message } from 'antd';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { homeDetails } from '../../Api/Home';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPagesDetails = async () => {
      try {
        const response = await homeDetails();
        const result = await response.json();
        console.log('API Response:', result);

        if (result?.portfoliopage) {
          setProjects(result.portfoliopage);
        } else {
          message.error('Invalid API response format');
        }
      } catch (error) {
        message.error('Failed to fetch data');
        console.error('Fetch error:', error);
      }
    };
    
    fetchPagesDetails();
  }, []);

  return (
    <section id='portfolio' style={{ padding: '60px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
        My Portfolio
      </Title>
      <Row gutter={[32, 32]} justify='start'>
        {projects.map((project, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Card
                hoverable
                bordered={false}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
                cover={
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                    <img src={`http://localhost:5000/api/img/${project._id}`} alt={project.title} style={{ width: '60px', height: '60px' }} />
                  </div>
                }
              >
                <Card.Meta
                  title={<Title level={4} style={{ textAlign: 'center' }}>{project.title}</Title>}
                  description={
                    <Paragraph ellipsis={{ rows: 3 }} style={{ textAlign: 'center', fontSize: '16px', color: '#555' }}>
                      {project.description}
                    </Paragraph>
                  }
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', gap: '10px' }}>
                  <Tooltip title='GitHub Repository'>
                    <Button shape='circle' type='primary' icon={<GithubOutlined />} href={project.github} target='_blank' />
                  </Tooltip>
                  <Tooltip title='Live Demo'>
                    <Button shape='circle' type='default' icon={<LinkOutlined />} href={project.liveDemo} target='_blank' />
                  </Tooltip>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
