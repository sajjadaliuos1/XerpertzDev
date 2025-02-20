import { Card, Col, Row, Typography, Table, message, Spin, Tag, Divider } from 'antd';
import { homeDetails } from "../../Api/Home";
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export default function DomainHosting() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        setLoading(true);
        const response = await homeDetails();
        const result = await response.json();
        console.log("API Response:", result);

        if (result && Array.isArray(result.domainpage)) {
          setDomains(result.domainpage);
        } else {
          console.error("Unexpected API response:", result);
          message.error("Invalid API response format");
        }
      } catch (error) {
        message.error("Failed to fetch domain data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, []);

  const getCardAccentColor = (title) => {
    if (!title) return '#1890ff';

    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('gold') || lowerTitle.includes('premium')) return '#1E90FF';
    if (lowerTitle.includes('silver') || lowerTitle.includes('business')) return '#808080';
    if (lowerTitle.includes('bronze') || lowerTitle.includes('starter')) return '#A0522D';
    return '#1890ff';
  };

  const prepareFeatureTableData = (features) => {
    if (!features || !Array.isArray(features) || features.length === 0) {
      return [];
    }

    return features.map((feature, index) => ({
      key: index,
      feature: feature,
    }));
  };

  return (
    <section id="domain" style={{ paddingTop: "60px" }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <Title level={2} style={{  color: "#1890ff" }}>
          Domain / Hosting
        </Title>
        <Paragraph style={{ fontSize: "16px", fontWeight: '500', color: '#555' }}>
          Select the best hosting plan for your needs.
          <span style={{ fontWeight: '500', color: '#611d1d' }}>
            All packages include a free .com domain and reliable hosting.
          </span>
        </Paragraph>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
          <Text style={{  marginTop: '20px' }}>Loading domain plans...</Text>
        </div>
      ) : (
        <Row gutter={[10, 10]} justify="center">
          {domains.length > 0 ? (
            domains.map((domain, index) => {
              const accentColor = getCardAccentColor(domain.title);
              const featuresData = prepareFeatureTableData(domain.features);
              const columns = [
                {
                  title: 'Features',
                  dataIndex: 'feature',
                  key: 'feature',
                }
              ];

              return (
                <Col xs={24} sm={24} md={12} lg={8} xl={6} key={domain._id || index}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    title={
                      <div style={{
                        background: accentColor,
                        padding: '15px',
                        borderRadius: '8px 8px 0 0',
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                        <Title level={3} style={{ margin: 0, color: '#fff', fontSize: '22px' }}>
                          {domain.title || `Plan ${index + 1}`}
                        </Title>
                      </div>
                    }
                  >
                    
                    <Divider />

                    <div>
                      <Tag color={accentColor} style={{ fontSize: "14px", padding: "5px 10px" }}>
                        FEATURES
                      </Tag>
                      <Table 
                        dataSource={featuresData}
                        columns={columns}
                        pagination={false}
                        size="small"
                        bordered
                      />
                      <Divider />
                    </div>

                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                      <button style={{
                        background: accentColor,
                        border: "none",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background 0.3s ease-in-out"
                      }}
                        onMouseOver={(e) => e.target.style.background = "#0056b3"}
                        onMouseOut={(e) => e.target.style.background = accentColor}
                      >
                        Select Plan
                      </button>
                    </div>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col span={24} style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">No domain plans available. Please add some from the admin panel.</Text>
            </Col>
          )}
        </Row>
      )}
    </section>
  );
}
