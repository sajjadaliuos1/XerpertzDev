import { Table, Button, Space, Popconfirm, message, Layout, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import HomeModel from './PagesModel'; // Import HomeModel
import { homeDetails } from '../../Api/home';
import { useState, useEffect } from 'react';

const { Content } = Layout;
const { Search } = Input;

const Pagesdetails = () => {
  const [data, setData] = useState([]); // Store original data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all home details
  const fetchPagesDetails = async () => {
    try {
      const response = await homeDetails();
      const result = await response.json();
      const formattedData = result.map((item, index) => ({
        ...item,
        key: index + 1, // Add a unique key
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      message.error('Failed to fetch data');
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchPagesDetails();
  }, []);

  // Search function
  const handleSearch = (value) => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase()) ||
      item.paragraph?.toLowerCase().includes(value.toLowerCase()) ||
      item.category?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Delete function
  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
    message.success('Deleted successfully');
  };

  // Define table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Paragraph',
      dataIndex: 'paragraph', // Ensure lowercase "p"
      key: 'paragraph',
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
      render: (text) => <img src={'text'} alt="example" width="80" />,
    },
    {
      title: 'Category',
      dataIndex: 'category', // Ensure lowercase "c"
      key: 'category',
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
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
        {/* Search Input */}
        <Search
          placeholder="Search by title, description, category..."
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          style={{ marginBottom: 16, width: '50%' }}
        />

        {/* Add New Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          Add New
        </Button>

        {/* Data Table */}
        <Table
          columns={columns}
          dataSource={filteredData} // Use filtered data
          pagination={{ pageSize: 5 }} // Add pagination
          rowKey="key"
          bordered
          size="small"
        />
      </div>

      {/* HomeModel Modal */}
      <HomeModel isModalVisible={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
    </Content>
  );
};

export default Pagesdetails;
