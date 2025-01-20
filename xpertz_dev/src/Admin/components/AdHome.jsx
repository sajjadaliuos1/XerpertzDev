import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import HomeModel from './HomeModel'; // Import HomeModel

const AdHome = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      title: 'Sample Title 1',
      Paragraph: 'dffdsfsdfd',
      description: 'Description for title 1',
      Category: 'Home',
      image: 'https://via.placeholder.com/100',
    },
    {
      key: '2',
      title: 'Sample Title 2',
      description: 'Description for title 2',
      Paragraph: 'dffdsfsdfd',
      Category: 'About us',
      image: 'https://via.placeholder.com/100',
    },
  ]);
  
  const [count, setCount] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Paragraph',
      dataIndex: 'Paragraph',
      key: 'Paragraph',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="example" width="80" />,
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
      ellipsis: true,
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
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const { Content } = Layout;

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
          onClick={showModal} // Open the modal on button click
          style={{ marginBottom: 16 }}
        >
          Add New
        </Button>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="key"
          bordered
          size="small"
          responsive
        />
      </div>

      {/* HomeModel Modal */}
      <HomeModel isModalVisible={isModalOpen} handleCancel={handleModalClose} />
    </Content>
  );
};

export default AdHome;
