import { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Popconfirm, message, Modal, Form,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { AllUsers, DeleteUser, UpdateUser, registerUser } from '../../Api/User';


const UserDetails = () => {
 
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await AllUsers();
      const result = await response.json();
      const formattedData = result.map((item, index) => ({ ...item, serial: index + 1 }));
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      message.error('Failed to fetch users');
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const result = await DeleteUser(id);
      if (result.ok) {
        message.warning('Record deleted successfully');
        fetchUsers();
      } else {
        message.error('Failed to delete record');
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(value)
        )
      )
    );
  };

  // Show modal for adding or editing user
  const showModal = (user = null) => {
    setEditingUser(user);
    setModalVisible(true);

    form.setFieldsValue({
      ...user,
      password: '', // Keep password empty when editing
      confirmPassword: '',
    });
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // Handle form submission (Create/Update user)
  const handleFinish = async (values) => {
    try {
      if (!editingUser) {
        // Register a new user
        const response = await registerUser(values);

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || 'Registration failed.');
        }

        message.success('User registered successfully!');
        form.resetFields();
        fetchUsers();
        handleModalCancel();
      } else {
        // Update existing user
        const userData = { ...values };
        delete userData.confirmPassword;

        // Only update password if provided
        if (!userData.password) {
          delete userData.password;
        }

        await UpdateUser(editingUser._id, userData);
        message.success('User updated successfully');
        fetchUsers();
        handleModalCancel();
      }
    } catch (error) {
      message.error(error.message || 'User ID is missing');
    }
  };

  // Table columns
  const columns = [
    { title: 'S.No', dataIndex: 'serial', key: 'serial' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },

    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
        {/* Edit Button with Tooltip */}
        <Tooltip title="Edit User">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
        </Tooltip>
      
        {/* Delete Button with Tooltip */}
        <Tooltip title="Delete User">
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Tooltip>
      </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>User Details</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder='Search users...'
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
          Add User
        </Button>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey='id' pagination={{ pageSize: 5 }} bordered />

      {/* Modal for Add/Edit User */}
      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleFinish}>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name='password'
            label='New Password'
            rules={[{ required: false, message: 'Please enter a password' }]}
          >
            <Input.Password placeholder='Leave empty to keep current password' />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            rules={[
              { required: false, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Confirm new password' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button style={{ marginLeft: 10 }} onClick={handleModalCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDetails;