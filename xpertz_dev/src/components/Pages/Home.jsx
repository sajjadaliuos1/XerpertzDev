import React from "react";
import { 
  Layout, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Space, 
  List, 
  Image 
} from "antd";
import { 
  EyeOutlined, 
  CheckCircleOutlined 
} from "@ant-design/icons";
import workspace from "../../assets/images/workspace.png";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Home() {
  return (
    <section id="home" style={{ backgroundColor: "#fff" }}>
      
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large">
              <Title level={1} style={{ color: "#1890ff" }}>
                Unlock <span style={{ color: "#1890ff" }}>Innovation</span> with
                the BEST IT Solution in Swat
              </Title>
              <Paragraph>
                We deliver cutting-edge solutions tailored to your needs,
                ensuring exceptional user experiences across all platforms.
              </Paragraph>
              <List
                dataSource={[
                  "Your Success is Our Success",
                  "Passionate About Software Development",
                  "We Listen, We Work Together",
                  "Responsive Solutions for All Devices",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CheckCircleOutlined style={{ color: "#1890ff" }} />}
                      title={<Text>{item}</Text>}
                    />
                  </List.Item>
                )}
              />
              <Button type="primary" icon={<EyeOutlined />} size="large" href="#service">
                Learn More
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Image
              src={workspace}
              alt="Workspace"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>
        </Row>
    
    </section>
  );
}