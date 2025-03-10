import { Table, Button, Space, Popconfirm, message, Layout, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PagesModel from './PagesModel';
import { homeDetails, DeleteHome } from '../../Api/Home';
import { useState, useEffect } from 'react';

const { Content } = Layout;
const { Search } = Input;

const Pagesdetails = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchPagesDetails = async () => {
  try {
    const response = await homeDetails();
    const result = await response.json();

    console.log("Full API Response:", result); // Debugging  

    const combinedData = [
      ...(result.homepage || []).map((item) => ({ ...item, category: 'Home' })),
      ...(result.aboutpage || []).map((item) => ({ ...item, category: 'AboutUs' })),
      ...(result.servicespage || []).map((item) => ({ ...item, category: 'services' })),
      ...(result. portfoliopage || []).map((item) => ({ ...item, category: 'portfolio' })),
      ...(result. teampage || []).map((item) => ({ ...item, category: 'team' })),
      ...(result. domainpage || []).map((item) => ({ ...item, category: 'domains' })),
      ...(result. clientpage || []).map((item) => ({ ...item, category: 'ourclients' })),
      ...(result. businesspage || []).map((item) => ({ ...item, category: 'business' })),
      ...(result. contactpage || []).map((item) => ({ ...item, category: 'contact' })),   // Ensure correct key
    ];

    console.log("Combined Data:", combinedData); // Debugging  

    setData(combinedData);
    setFilteredData(combinedData);
  } catch (error) {
    message.error("Failed to fetch data");
    console.error("Fetch error:", error);
  }
};


  useEffect(() => {
    fetchPagesDetails();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(value.toLowerCase()) ||
        item.description?.toLowerCase().includes(value.toLowerCase()) ||
        item.paragraph?.toLowerCase().includes(value.toLowerCase()) ||
        item.category?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const result = await DeleteHome(id);
      if (!result.ok) throw new Error('Failed to delete record');
      message.warning('Record deleted successfully');
      fetchPagesDetails();
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <Content style={{ margin: 0, background: '#fff', padding: 24, minHeight: '280px' }}>
      <Search
        placeholder="Search by title, description, category..."
        allowClear
        enterButton="Search"
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: '50%' }}
      />
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
      <Table
        columns={[
          { title: 'S.No', key: 'serialNumber', render: (_, __, index) => index + 1 },
          {
            title: 'Title', 
            dataIndex: 'title', 
            key: 'title', 
            ellipsis: true,
            render: (_, record) => {
              if (record.category === 'contact') {
                return (
                  <Tooltip title={record.address || 'N/A'}>
                    <span>{record.address || 'N/A'}</span>
                  </Tooltip>
                );
              }
              return (
                <Tooltip title={record.title || 'N/A'}>
                  <span>{record.title || 'N/A'}</span>
                </Tooltip>
              );
            }
          },
          {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            key: 'paragraph',
            ellipsis: true,
            render: (_, record) => {
              const content = record.category === 'contact' ? record.phone || 'N/A' : record.paragraph || 'N/A';
              
              return (
                <Tooltip title={content}>
                  <span>{content}</span>
                </Tooltip>
              );
            }
          },
          { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
          {
            title: 'Name',
            key: 'name',
            ellipsis: true,
            render: (_, record) => {
              const content = record.category === 'contact' 
                ? record.email || 'N/A' 
                : record.name || record.clientname || 'N/A';
          
              return (
                <Tooltip title={content}>
                  <span>{content}</span>
                </Tooltip>
              );
            }
          }
          ,
          { title: 'Role', dataIndex: 'role', key: 'role', ellipsis: true },
          { 
            title: 'Features', 
            dataIndex: 'features', 
            key: 'features', 
            ellipsis: true,
            render: (features) => {
              if (Array.isArray(features)) {
                return features.join(', ');
              }
              return features;
            }
          },
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
              // Don't render image for domains category
              if (record.category?.toLowerCase() === 'domains' 
              || record.category?.toLowerCase() === "business" 
              ||record.category?.toLowerCase() === "contact") 
              {
                return 'N/A';
              } 
              return (
                <img
                  src={`http://localhost:5000/api/img/${record._id}`}
                  alt="image"
                  width="80"
                  height="50"
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
              );
            
          }, 
        } ,
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
