import { Table, Button, Space, Popconfirm, message, Layout, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PagesModel from './PagesModel'; // Import PagesModel
import { homeDetails, DeleteHome } from '../../Api/Home';
import { useState, useEffect } from 'react';

const { Content } = Layout;
const { Search } = Input;

const Pagesdetails = () => {
  const [data, setData] = useState([]); // Store original data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Track selected record for editing

  // Fetch all page details (Home & About)
  const fetchPagesDetails = async () => {
    try {
      const response = await homeDetails();
      const result = await response.json();

      // Combine homepage and aboutpage data into a single list
      const combinedData = [
        ...result.homepage.map((item) => ({ ...item, category: 'Home' })), // Label Home data
        ...result.aboutpage.map((item) => ({ ...item, category: 'AboutUs' })), // Label About data
      ];

      setData(combinedData);
      setFilteredData(combinedData);
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
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.paragraph?.toLowerCase().includes(value.toLowerCase()) ||
        item.category?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Delete function
  const handleDelete = async (id) => {
    try {
      const result = await DeleteHome(id);
      if (result.ok) {
        message.warning('Record deleted successfully');
        fetchPagesDetails();
      } else {
        message.error('Failed to delete record');
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  // Handle Edit
  const handleEdit = (record) => {
    setSelectedRecord(record); // Set selected record for editing
    setIsModalOpen(true);
  };

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
          onClick={() => {
            setIsModalOpen(true);
            setSelectedRecord(null);
          }}
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          Add New
        </Button>

        {/* Data Table */}
        <Table
          columns={[
            { title: 'S.No', key: 'serialNumber', render: (_, __, index) => index + 1 },
            { title: 'Title', dataIndex: 'title', key: 'title', ellipsis: true },
            { title: 'Paragraph', dataIndex: 'paragraph', key: 'paragraph', ellipsis: true },
            { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
            {
              title: 'Image',
              dataIndex: 'image',
              key: 'image',
              render: (_, record) => (
                <img
                  src={`http://localhost:5000/api/img/${record._id}`}
                  alt="image"
                  width="80"
                  height="50"
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
              ),
            },
            { title: 'Category', dataIndex: 'category', key: 'category', ellipsis: true },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => (
                <Space size="middle">
                  <Tooltip title="Edit">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
                  </Tooltip>
                  <Popconfirm
                    title="Are you sure you want to delete?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          bordered
          size="small"
        />
      </div>

      {/* PagesModel Modal */}
      <PagesModel
        isModalVisible={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        initialData={selectedRecord}
        refreshData={fetchPagesDetails}
      />
    </Content>
  );
};

export default Pagesdetails;
