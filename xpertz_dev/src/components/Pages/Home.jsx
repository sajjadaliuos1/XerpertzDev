import React from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Space,
  List,
  Image,
} from "antd";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import workspace from "../../assets/images/workspace.png"; // Adjust the path to your image file

const { Title, Text, Paragraph } = Typography;

const textAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
};

export default function Home() {
  return (
    <Layout style={{ backgroundColor: "#1890ff", minHeight: "100vh" }}>
      {/* Menu Placeholder (space reserved for menu) */}
      <div style={{ height: "64px" }}></div>

      {/* Main Content */}
      <section id="home" style={{ backgroundColor: "#1890ff" }}>
        <Row
          justify="center"
          align="middle"
          style={{
           
          
            backgroundColor: "#1890ff",
          }}
        >
          {/* Text Section */}
          <Col xs={24} md={12}>
  <Space
    direction="vertical"
    size="small"
    style={{ marginLeft: "16px" }} // Added margin-left
  >
    <motion.div
      initial="hidden"
      animate="visible"
      variants={textAnimation}
    >
      <Title
        level={2}
        style={{ color: "#fff", fontSize: "20px" }}
      >
        Unlock <span style={{ color: "#fff" }}>Innovation</span> with
        the BEST IT Solution in Swat
      </Title>
    </motion.div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={textAnimation}
    >
      <Paragraph style={{ color: "#fff", fontSize: "14px" }}>
        We deliver cutting-edge solutions tailored to your needs,
        ensuring exceptional user experiences across all platforms.
      </Paragraph>
    </motion.div>
    <motion.div initial="hidden" animate="visible" variants={textAnimation}>
  <List
    dataSource={[
      "Your Success is Our Success",
      "Passionate About Software Development",
      "We Listen, We Work Together",
      "Responsive Solutions for All Devices",
    ]}
    renderItem={(item) => (
      <List.Item style={{ padding: "0" }}> {/* Removes extra padding */}
        <List.Item.Meta
          avatar={<CheckCircleOutlined style={{ color: "#fff" }} />}
          title={
            <Text style={{ color: "#fff", fontSize: "14px", lineHeight: "1.0" }}>
              {item}
            </Text>
          }
        />
      </List.Item>
    )}
  />
</motion.div>



    <motion.div
      initial="hidden"
      animate="visible"
      variants={textAnimation}
    >
      <Button
        type="primary"
        icon={<EyeOutlined />}
        size="middle"
        href="#service"
        style={{
          backgroundColor: "#fff",
          color: "#1890ff",
          borderColor: "#fff",
          marginBottom: "16px", // Added margin-bottom
        }}
      >
        Learn More
      </Button>
    </motion.div>
  </Space>
</Col>
          {/* Image Section */}
          <Col xs={24} md={12}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageAnimation}
            >
              <Image
                src={workspace}
                alt="Workspace"
                style={{
                  maxWidth: "80%", // Reduced image width
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
