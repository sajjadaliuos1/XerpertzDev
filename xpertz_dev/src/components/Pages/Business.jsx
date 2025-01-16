import React from 'react';
import { Row, Col, Typography, Table, Card } from 'antd';

const { Title, Paragraph } = Typography;

export default function Business_xpertzdev() {
  const data = [
    { key: '1', bundlePrice: 'Rs. 1000', ratePerSMS: 'Rs. 6.5' },
    { key: '2', bundlePrice: 'Rs. 2000', ratePerSMS: 'Rs. 6' },
    { key: '3', bundlePrice: 'Rs. 5000', ratePerSMS: 'Rs. 5.95' },
    { key: '4', bundlePrice: 'Rs. 10000', ratePerSMS: 'Rs. 5.5' },
    { key: '5', bundlePrice: 'Rs. 20000', ratePerSMS: 'Rs. 5' },
    { key: '6', bundlePrice: '', ratePerSMS: '100,000+ (Call for Prices)' },
  ];

  const columns = [
    { title: 'Bundle Price', dataIndex: 'bundlePrice', key: 'bundlePrice' },
    { title: 'Rate / SMS', dataIndex: 'ratePerSMS', key: 'ratePerSMS' },
  ];

  return (
    <section id="business" style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      
        <Card bordered style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>
            Business SMS
          </Title>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={14}> {/* Adjusted to 14 */}
              <Paragraph style={{ fontSize: '16px', marginBottom: '10px' }}>
                <strong>Xpertz Dev</strong> offers an excellent app to send SMS messages from your company name using the Internet through:
              </Paragraph>
              <ul style={{ fontSize: '16px', marginBottom: '10px' }}>
                <li>Website</li>
                <li>Your Mobile</li>
                <li>Your Application, through APIs</li>
                <li>Email</li>
              </ul>
              <Paragraph style={{ fontSize: '16px', marginBottom: '16px' }}>
                We cover all networks in Pakistan, and our SMS gateway has many advantages over competing services in the market. High capacity and reliability—send thousands of SMS per minute.
                <strong> Xpertz Dev</strong> provides an easy-to-use API that can be integrated into your existing desktop or web application. Our robust APIs make our branded SMS the best choice for developers.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '16px' }}>
                <strong>Detailed reporting:</strong> Different detailed reports with message history.
                <br />
                <strong>Message Scheduling:</strong> Schedule your messages to be delivered at a specific date/time.
                <br />
                <strong>Outstanding Support:</strong> Email, ticketing system, or phone.
                <br />
                <strong>Simple Pricing:</strong> No hidden or monthly charges.
                <br />
                <strong>Guarantee Delivery:</strong> Instant and guaranteed deliveries to all networks in Pakistan.
                <br />
                <strong>Branded SMS:</strong> Send SMS from your business name.
                <br />
                We offer various bundles to cater to the needs of everyone, from individuals and startups to big firms. SMS credits purchased from us do not expire monthly and are valid for the entire year.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', fontStyle: 'italic' }}>
                <em>*For brand mask registration, there are setup charges of Rs. 3000.</em>
              </Paragraph>
            </Col>

            <Col xs={24} md={10}> {/* Adjusted to 10 */}
              <Table
                columns={columns}
                dataSource={data}
                bordered
                style={{
                  fontSize: '14px', // Adjusted font size of the table
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Col>
          </Row>
        </Card>
     
    </section>
  );
}
