import React from 'react';
import { Row, Col, Card } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { HeartOutlined } from '@ant-design/icons';

// Import logos (Ensure correct paths to images)
import ydiLogo from '../../assets/images/ydi.png';
import ghssLogo from '../../assets/images/ghss.png';
import dgsLogo from '../../assets/images/dgs.png';
import jmuLogo from '../../assets/images/jmu.png';
import fixeeLogo from '../../assets/images/fixeegluelogo.jpg';
import pkNurseryLogo from '../../assets/images/pklogo.png';
import noorCorpLogo from '../../assets/images/logo.jpg';
import sgmaLogo from '../../assets/images/sgma.png';
import maarifLogo from '../../assets/images/maarif.png';

const clientData = [
  { name: 'YDI Swat', url: 'https://ydi.edu.pk/', logo: ydiLogo },
  { name: 'GHSS Charbagh Swat', url: 'javascript:void(0)', logo: ghssLogo },
  { name: 'Diamond Green School Mingora', url: 'javascript:void(0)', logo: dgsLogo },
  { name: 'Jamia Mazhar Ul Uloom', url: 'https://www.jmu.edu.pk/', logo: jmuLogo },
  { name: 'Fixee Swat', url: 'http://fixee.com.pk/', logo: fixeeLogo },
  { name: 'Pakhtunkhwa Fruit Nursery Farm', url: 'http://pknursery.com/', logo: pkNurseryLogo },
  { name: 'Noor Corporation Mingora', url: 'javascript:void(0)', logo: noorCorpLogo },
  { name: 'Swat Gems Merchants Association', url: 'https://www.sgmapk.com/', logo: sgmaLogo },
  { name: 'Jamia Arabia Maarif Ul Quran', url: 'https://jamiamaarif.edu.pk/', logo: maarifLogo },
];

const Clients = () => {
  return (
    <section id="clients" style={{ padding: '50px 0', backgroundColor: '#f0f2f5' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontWeight: 'bold', fontSize: '36px' }}>
        Our Clients
      </h2>
      <Row gutter={[16, 16]} justify="center">
        {clientData.map((client, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Fade delay={index * 100} cascade>
              <Card
                hoverable
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  overflow: 'hidden',
                }}
                cover={
                  <a href={client.url} target="_blank" rel="noopener noreferrer">
                    <img
                      alt={client.name}
                      src={client.logo}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                      className="logo-img"
                    />
                  </a>
                }
                bodyStyle={{
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                }}
                onMouseEnter={(e) => {
                  const img = e.target.querySelector('img');
                  img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const img = e.target.querySelector('img');
                  img.style.transform = 'scale(1)';
                }}
              >
                <Card.Meta
                  title={client.name}
                  description={
                    <HeartOutlined style={{ color: '#f5222d', fontSize: '18px' }} />
                  }
                />
              </Card>
            </Fade>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Clients;
