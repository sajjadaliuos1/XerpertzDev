import { Card, Rate, Typography, message, Carousel } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import { homeDetails } from '../../Api/Home';
import { useEffect, useState, useRef } from 'react';

const { Title } = Typography;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchPagesDetails = async () => {
      try {
        const response = await homeDetails();
        const result = await response.json();
        console.log('API Response:', result);

        if (result?.clientpage) {
          setClients(result.clientpage);
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
    <section id="clients" style={{ padding: '60px', backgroundColor: '#f0f2f5', position: 'relative' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>Our Clients</Title>
      <LeftOutlined 
        onClick={() => carouselRef.current.prev()}
        style={{ position: 'absolute', top: '50%', left: '10px', fontSize: '24px', cursor: 'pointer', zIndex: 1 }}
      />
      <RightOutlined 
        onClick={() => carouselRef.current.next()}
        style={{ position: 'absolute', top: '50%', right: '10px', fontSize: '24px', cursor: 'pointer', zIndex: 1 }}
      />
      <Carousel ref={carouselRef} autoplay dots={true} autoplaySpeed={2500} speed={2000} slidesToShow={4} responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ]}>
        {clients.map((client) => (
          <div key={client._id}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                textAlign: 'center',
              }}
              cover={
                <a href={client.projecturl} target="_blank" rel="noopener noreferrer">
                  <img
                    alt={client.clientname}
                    src={`http://localhost:5000/api/img/${client._id}`}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'contain',
                      paddingTop: '10px',
                    }}
                  />
                </a>
              }
              bodyStyle={{ padding: '20px', backgroundColor: '#fff' }}
            >
              <Card.Meta
                title={
                  <div style={{ paddingBottom: '10px', borderBottom: '2px solid #1890ff' }}>
                    {client.clientname}
                  </div>
                }
                description={
                  <div style={{ marginTop: '10px' }}>
                    <HeartOutlined style={{ color: '#f5222d', fontSize: '18px', marginRight: '10px' }} />
                    <Rate allowHalf defaultValue={4.5} style={{ fontSize: '16px' }} />
                  </div>
                }
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Clients;
