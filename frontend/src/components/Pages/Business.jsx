import { Row, Col, Typography, Table, Card, message } from 'antd';
import { homeDetails } from '../../Api/Home';
import { useEffect, useState, useCallback } from 'react';

const { Title } = Typography;

export default function Business_xpertzdev() {
  const [businessData, setBusinessData] = useState({
    title: 'Business SMS',
    details: '',
    smsRates: []
  });

  const [loading, setLoading] = useState(true);

  // Function to parse HTML table string
  const parseHtmlTableString = useCallback((htmlString) => {
    console.log('Parsing HTML table string:', htmlString);
    
    try {
      if (!htmlString || !htmlString.includes('<table')) {
        console.warn('No table found in the HTML string');
        return [];
      }
      
      const rows = [];
      const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let rowMatch;

      while ((rowMatch = rowRegex.exec(htmlString)) !== null) {
        const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        const cells = [];
        let cellMatch;

        while ((cellMatch = cellRegex.exec(rowMatch[0])) !== null) {
          let content = cellMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();
          
          cells.push(content);
        }

        if (cells.length >= 2) {
          rows.push({
            bundlePrice: cells[0],
            ratePerSMS: cells[1]
          });
        }
      }

      console.log('Parsed rows:', rows);
      return rows;
    } catch (error) {
      console.error('Error parsing HTML table:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchPagesDetails = async () => {
      setLoading(true);
      try {
        const response = await homeDetails();
        const result = await response.json();
        console.log('API Response:', result);

        if (result?.businesspage) {
          const businessPageData = Array.isArray(result.businesspage) 
            ? result.businesspage[0] 
            : result.businesspage;
          
          const { title, details, SmSRate } = businessPageData;
          
          let parsedRates = [];
          
          if (typeof SmSRate === 'string') {
            parsedRates = parseHtmlTableString(SmSRate);
          } else if (Array.isArray(SmSRate)) {
            parsedRates = SmSRate;
          }
          
          const ratesWithKeys = parsedRates.map((rate, index) => ({
            key: index.toString(),
            ...rate
          }));

          setBusinessData({
            title: title || 'Business SMS',
            details: details || '',
            smsRates: ratesWithKeys.length > 0 ? ratesWithKeys : [
              { key: '0', bundlePrice: 'Rs. 1000', ratePerSMS: 'Rs. 6.5' },
              { key: '1', bundlePrice: 'Rs. 2000', ratePerSMS: 'Rs. 6' },
              { key: '2', bundlePrice: 'Rs. 5000', ratePerSMS: 'Rs. 5.95' },
              { key: '3', bundlePrice: 'Rs. 10000', ratePerSMS: 'Rs. 5.5' },
              { key: '4', bundlePrice: 'Rs. 20000', ratePerSMS: 'Rs. 5' },
              { key: '5', bundlePrice: '', ratePerSMS: '100,000+ (Call for Prices)' }
            ]
          });
        } else {
          message.error('Invalid API response format');
        }
      } catch (error) {
        message.error('Failed to fetch data');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPagesDetails();
  }, [parseHtmlTableString]); // Now `parseHtmlTableString` is correctly included

  const columns = [
    { title: 'Bundle Price', dataIndex: 'bundlePrice', key: 'bundlePrice' },
    { title: 'Rate / SMS', dataIndex: 'ratePerSMS', key: 'ratePerSMS' },
  ];

  return (
    <section id="business" style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <Card bordered style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} loading={loading}>
        <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>
          {businessData.title}
        </Title>
        <Row gutter={[20, 20]}>
          <Col xs={24} md={14}>
            <div 
              className="business-details" 
              dangerouslySetInnerHTML={{ __html: businessData.details }} 
            />
          </Col>
          <Col xs={24} md={10}>
            <Table
              columns={columns}
              dataSource={businessData.smsRates}
              bordered
              style={{
                fontSize: '14px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </section>
  );
}
