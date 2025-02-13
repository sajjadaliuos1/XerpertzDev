import { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Typography, Space, Image, message, List } from "antd";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import {  homeDetails } from '../../Api/Home';

const { Title, Paragraph, Text } = Typography;

const textAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
};

export default function Home() {
  const [data, setData] = useState(null);

  const fetchPagesDetails = async () => {
    try {
      const response = await homeDetails();
      const result = await response.json();
      
      console.log("Full API Response:", result); // Debugging
  
      // Make sure we're accessing 'homepage' correctly
      const homeData = result?.homepage?.length > 0 ? result.homepage[0] : null;
  
      console.log("Filtered Home Data:", homeData); // Debugging
  
      setData(homeData);
    } catch (error) {
      message.error("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };
  
  
  

  useEffect(() => {
    fetchPagesDetails();
  }, []);

  return (
    <Layout>
      <section id="home" style={{ padding: "50px", backgroundColor: "#1890ff" }}>
        <Row justify="center" align="middle">
          {/* Text Section */}
          <Col xs={24} md={12}>
            <Space direction="vertical" size="small" style={{ marginLeft: "16px" }}>
              <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                <Title level={2} style={{ color: "#fff", fontSize: "40px" }}>
                  {data ? data.title : "Loading..."}
                </Title>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                <Paragraph style={{ color: "#fff", fontSize: "16px" }}>
                  {data ? data.paragraph : "Loading..."}
                </Paragraph>
              </motion.div>

              {/* ✅ Fixed List Section */}
              <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                <List
                  dataSource={
                    data?.description
                      ? Array.isArray(data.description)
                        ? data.description
                        : data.description.split("\n") // Convert string to an array
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item style={{ padding: "0" }}>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: "#fff" }} />}
                        title={
                          <Text style={{ color: "#fff", fontSize: "14px", lineHeight: "2" }}>
                            {item}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: "No Data Available" }} // Show message if no data
                />
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  size="middle"
                  href="#services"
                  style={{ backgroundColor: "#fff", color: "#1890ff", borderColor: "#fff", marginBottom: "16px" }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Space>
          </Col>

          {/* Image Section */}
          <Col xs={24} md={12}>
            <motion.div initial="hidden" animate="visible" variants={imageAnimation}>
            <Image
  src={data?.image ? `http://localhost:5000/api/img/${data._id}` : "default-image.jpg"}
  alt="Workspace"
  style={{
    maxWidth: "80%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  }}
/>
            </motion.div>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}
