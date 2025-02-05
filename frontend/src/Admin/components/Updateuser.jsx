import { Form, Input, Button, Typography, Layout, Row, Col } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import {  useParams } from 'react-router-dom'; // Use useParams to get the id from the URL
import { useEffect, useState } from 'react';
import { oneUser } from '../../Api/routes';

const { Title,  } = Typography;
const { Content } = Layout;

export default function Updateuser() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();  // Get the ID from the URL

    useEffect(() => {
        getUser();
    }, [id]);

    const getUser = async () => {
        try {
            setLoading(true); // Start loading before the request
            const result = await oneUser(id);
            const data = await result.json();  // Parse the JSON response

            console.warn('Fetched user:', data);

            // Populate the form with the fetched data
            if (data) {
                form.setFieldsValue({
                    name: data.name,
                    email: data.email,
                    password: "",  // Password fields should be blanked out for security reasons
                    confirmPassword: "",
                });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);  // Stop loading once done
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Row justify="center" align="middle" style={{ flexGrow: 1, height: '100%' }}>
              

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
                                Update User
                            </Title>
                            <Form
                                form={form}
                                name="signup"
                                initialValues={{ remember: true }}
                                layout="vertical"
                                onFinish={(values) => console.log('Form values:', values)}
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
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: '100%' }}
                                        loading={loading} // Show loading state while fetching
                                    >
                                        Update User
                                    </Button>
                                </Form.Item>
                            </Form>

                            
                        </div>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
}
