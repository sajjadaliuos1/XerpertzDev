import { Form, Input, Button, Checkbox, Typography, Layout, Row, Col, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Api/User';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function Signup() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const onFinish = async (values) => {
      try {
          let response = await registerUser(values);
  
          if (!response.ok) {
              let result = await response.json();
              throw new Error(result.error || "Registration failed.");
          }
  
          let userData = await response.json();
          console.log("User Data Received:", userData); // Debugging
  
          // Ensure the response contains user and token
          if (!userData.user || !userData.token) {
              throw new Error("Invalid response from server. Missing user or token.");
          }
  
          // Store in localStorage
          localStorage.setItem("User", JSON.stringify(userData.user));
          localStorage.setItem("token", userData.token);
  
          console.log("Stored User:", localStorage.getItem("User"));
          console.log("Stored Token:", localStorage.getItem("token"));
  
          message.success("Registration successful! Redirecting...");
          form.resetFields();
          navigate("/admin");
      } catch (error) {
          message.error(error.message);
      }
  };
  
  
    

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Row justify="center" align="middle" style={{ flexGrow: 1, height: '100%' }}>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          style={{
            background: '#1890ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: 10, marginBottom: 10, width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
          </div>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
            Join Us!
          </Title>
          <Text style={{ color: '#fff', fontSize: 16, lineHeight: 1.5 }}>
            Create an account and start managing your platform with ease.
          </Text>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px',
          }}
        >
          <Content>
            <div style={{ maxWidth: 400, padding: 24, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Sign Up
              </Title>
              <Form
                form={form}
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinish} // Use the onFinish function passed as a prop
                layout="vertical"
              >
                
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
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

                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="agreement" valuePropName="checked" rules={[{ required: true, message: 'You must agree to the terms and conditions!' }]}>
                  <Checkbox>
                    I agree to the <Link to="/terms">terms and conditions</Link>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: '100%' }}
                  >
                    Sign Up
                    
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Text>
                  Already have an account?{' '}
                  <Link to="/admin" style={{ color: '#1890ff' }}>
                    Log in
                  </Link>
                </Text>
              </div>
            </div>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}