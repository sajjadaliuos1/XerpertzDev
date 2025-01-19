import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Upload ,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import InputBox from './InputBox'; // Import InputBox component

const AdminHome = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      title: 'Sample Title 1',
      description: 'Description for title 1',
      image: 'https://via.placeholder.com/100',
    },
    {
      key: '2',
      title: 'Sample Title 2',
      description: 'Description for title 2',
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const [count, setCount] = useState(3);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="example" width="100" />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="primary" />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
    message.success('Deleted successfully');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newData = {
      key: count,
      title: newTitle,
      description: newDescription,
      image: newImage ? newImage : 'https://via.placeholder.com/100',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setIsModalVisible(false);
    message.success('Added successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'done') {
      setNewImage(file.response.url); // Assuming the backend provides a URL
    }
  };
  const {  Content, } = Layout;
  return (
    <Content
                style={{
                  margin: 0,
                  background: '#fff',
                  padding: 24,
                  minHeight: '280px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
            <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Add New
      </Button>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
      />

      <Modal
        title="Add New Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <InputBox
            label="Title"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <InputBox
            label="Description"
            name="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            action="/upload" // Backend upload endpoint
            onChange={handleImageChange}
            accept="image/*"
          >
            {newImage ? (
              <img src={newImage} alt="Selected" width={100} />
            ) : (
              <div>
                <UploadOutlined /> Upload Image
              </div>
            )}
          </Upload>
        </div>
      </Modal>
    </div>
              </Content>
    
  );
};

export default AdminHome;
