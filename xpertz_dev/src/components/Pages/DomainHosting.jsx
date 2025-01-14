import React from 'react';
import { Card, Col, Row, Typography, Table } from 'antd';

const { Title, Text } = Typography;

const columns = [
  {
    title: 'Feature',
    dataIndex: 'feature',
    key: 'feature',
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
    render: (text) => <Text>{text}</Text>,
  },
];

export default function DomainHosting() {
  // Data for the table rows
  const popularData = [
    { feature: 'Disk Space', details: '1GB' },
    { feature: 'Data Transfer', details: '5GB' },
    { feature: 'Database', details: '3' },
    { feature: 'Emails', details: '5' },
    { feature: 'Sub-domains', details: '5' },
  ];

  const silverData = [
    { feature: 'Disk Space', details: '2GB' },
    { feature: 'Data Transfer', details: '10GB' },
    { feature: 'Database', details: '5' },
    { feature: 'Emails', details: '5' },
    { feature: 'Sub-domains', details: '5' },
  ];

  const goldData = [
    { feature: 'Disk Space', details: '5GB' },
    { feature: 'Data Transfer', details: '15GB' },
    { feature: 'Database', details: '7' },
    { feature: 'Emails', details: '10' },
    { feature: 'Sub-domains', details: '10' },
  ];

  return (
    <section id="domain" style={{ padding: '40px' }}>
      <div className="container">
        <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>
          Domain / Hosting
        </Title>
        <Text type="secondary" style={{ textAlign: 'center', color:"black" , display: 'block', marginBottom: '10px' ,fontSize:'12px' }}>
          SELECT HOSTING PLANS ACCORDING TO YOUR NEEDS (Select Package with .com domain and hosting)
        </Text>
        <Row gutter={[16, 16]} justify="center">
          {/* Popular Plan */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Popular"
              bordered
              hoverable
              extra={<Text strong style={{ fontSize: '22px' }}>Rs. 9500 / Year</Text>}
              style={{
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                border: '2px solid #1890ff', // Blue border
              }}
            >
              <Table
                columns={columns}
                dataSource={popularData}
                pagination={false}
                showHeader={false}
                bordered
                size="small"
              />
            </Card>
          </Col>

          {/* Silver Plan */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Silver"
              bordered
              hoverable
              extra={<Text strong style={{ fontSize: '22px' }}>Rs. 13500 / Year</Text>}
              style={{
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                border: '2px solid #1890ff', // Blue border
              }}
            >
              <Table
                columns={columns}
                dataSource={silverData}
                pagination={false}
                showHeader={false}
                bordered
                size="small"
              />
            </Card>
          </Col>

          {/* Gold Plan */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Gold"
              bordered
              hoverable
              extra={<Text strong style={{ fontSize: '22px' }}>Rs. 18500 / Year</Text>}
              style={{
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                border: '2px solid #1890ff', // Blue border
              }}
            >
              <Table
                columns={columns}
                dataSource={goldData}
                pagination={false}
                showHeader={false}
                bordered
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
