import React from 'react';
import { Row, Col, Typography, Table, Card } from 'antd';

const { Title, Paragraph } = Typography;

export default function Business_xpertzdev() {
  const data = [
    {
      key: '1',
      bundlePrice: 'Rs. 1000',
      ratePerSMS: 'Rs. 6.5',
    },
    {
      key: '2',
      bundlePrice: 'Rs. 2000',
      ratePerSMS: 'Rs. 6',
    },
    {
      key: '3',
      bundlePrice: 'Rs. 5000',
      ratePerSMS: 'Rs. 5.95',
    },
    {
      key: '4',
      bundlePrice: 'Rs. 10000',
      ratePerSMS: 'Rs. 5.5',
    },
    {
      key: '5',
      bundlePrice: 'Rs. 20000',
      ratePerSMS: 'Rs. 5',
    },
    {
      key: '6',
      bundlePrice: '',
      ratePerSMS: '100,000+ (Call for Prices)',
    },
  ];

  const columns = [
    {
      title: 'Bundle Price',
      dataIndex: 'bundlePrice',
      key: 'bundlePrice',
    },
    {
      title: 'Rate / SMS',
      dataIndex: 'ratePerSMS',
      key: 'ratePerSMS',
    },
  ];

  return (
    <section id="sms" style={{
      padding: '20px 0',
    }}>
      <div className="container">
        <Card bordered>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '10px', color: '#1890ff' }}>
            Business SMS
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Paragraph style={{ fontSize: '14px' }}>
                <strong>Xpertz Dev</strong> offers an excellent app to send SMS messages from your company name using the Internet through:
              </Paragraph>
              <ul style={{ fontSize: '14px' }}>
                <li>Website</li>
                <li>Your Mobile</li>
                <li>Your Application, through APIs</li>
                <li>Email</li>
              </ul>
              <Paragraph style={{ fontSize: '12px' }}>
                We cover all networks in Pakistan and our SMS gateway has many advantages over competing services in the market. High capacity and reliability, send thousands of SMS per minute.
                <strong>Xpertz Dev</strong> provides an easy-to-use API that can be integrated into your existing desktop or web application. Our robust APIs make our branded SMS a best choice for developers.
              </Paragraph>
              <Paragraph style={{ fontSize: '12px' }}>
                <strong>Detailed reporting:</strong> Different detailed reports with message history.
                <br />
                <strong>Message Scheduling:</strong> Schedule your messages to be delivered at a specific date/time.
                <br />
                <strong>Outstanding Support:</strong> Email, ticketing system, or phone.
                <br />
                <strong>Simple Pricing:</strong> No hidden and monthly charges.
                <br />
                <strong>Guarantee Delivery:</strong> Instant and guaranteed deliveries to all networks in Pakistan.
                <br />
                <strong>Branded SMS:</strong> Send SMS from your business name.
                <br />
                We offer various bundles to cater for the needs of everyone, from individuals and startups to big firms. SMS credits purchased from us do not expire monthly and are valid for the entire year.
              </Paragraph>
              <Paragraph style={{ fontStyle: 'italic', textAlign: 'left', fontSize: '10px' }}>
                <em>*For brand mask registration, there are setup charges of Rs. 3000.</em>
              </Paragraph>
            </Col>

            <Col span={8}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                size="middle"
                style={{ fontSize: '10px' }} // Set font size for the table text
              />
            </Col>
          </Row>
        </Card>
      </div>
    </section>
  );
}
