import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Layout, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logo from "../assets/images/logo.png";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function Login() {
  const logoContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: 10,
    marginBottom: 10,
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        overflowX: 'hidden',
      }}
    >
      <Row
        justify="center"
        align="middle"
        gutter={[0, 32]} // Adds vertical space between columns
        style={{
          flexGrow: 1,
          height: '100%',
          margin: '0',
          padding: '0',
          overflowX: 'hidden',
          width: '100%',
        }}
      >
        {/* Left Side: Logo Section */}
        <Col
          xs={24} sm={24} md={10} lg={10}
          style={{
            background: '#1890ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: '20px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <div style={logoContainerStyle}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '100px',
                height: '100px',
              }}
            />
          </div>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
            Welcome Back!
          </Title>
          <Text style={{ color: '#fff', fontSize: 16, lineHeight: 1.5 }}>
            Access the admin panel and manage your platform with ease.
          </Text>
        </Col>

        {/* Right Side: Login Form Section */}
        <Col
          xs={24} sm={24} md={12} lg={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px', // Added top padding for space
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <Content>
            <div
              style={{
                maxWidth: 400,
                padding: 24,
                borderRadius: 8,
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                width: '100%',
              }}
            >
              <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Admin Login
              </Title>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      width: '100%',
                    }}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Text>
                  Don't have an account?{' '}
                  <a href="/signup" style={{ color: '#1890ff' }}>
                    Sign up
                  </a>
                </Text>
              </div>
            </div>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}
