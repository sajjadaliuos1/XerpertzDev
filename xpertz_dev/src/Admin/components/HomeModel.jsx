import React, { useState } from 'react';
import { Modal, Row, Col, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InputBox from './InputBox';
import TextareaBox from './TextareaBox';
import useDropdown from './Dropdown';
  // Import AboutModel component

export default function HomeModel({ isModalVisible, handleCancel }) {
  const [newTitle, setNewTitle] = useState('');
  const [newParagraph, setnewParagraph] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [category, setCategory] = useState('Home'); // Default category
  const [count, setCount] = useState(3);
  const [dataSource, setDataSource] = useState([]);
  const { DropdownButton } = useDropdown();

  // Handle category change from dropdown
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleOk = () => {
    const newData = {
      key: count,
      title: newTitle,
      Paragraph: newParagraph,
      description: newDescription,
      image: newImage ? newImage : 'https://via.placeholder.com/100',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    message.success('Added successfully');
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'done') {
      setNewImage(file.response.url);
    }
  };

  

  return (
    <>
      {/* Conditionally Render HomeModel or AboutModel */}
  
        <Modal
          title={'Add New ' + category}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="50%"
          bodyStyle={{ padding: '20px' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <DropdownButton
                style={{ width: '100%' }}
                onCategoryChange={handleCategoryChange} // Update the selected category
              />
            </Col>

            <Col xs={24}>
              <InputBox
                label="Title"
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Col>

            <Col xs={24}>
              <InputBox
                label="Paragraph"
                name="Paragraph"
                value={newParagraph}
                onChange={(e) => setnewParagraph(e.target.value)}
              />
            </Col>

            <Col xs={24}>
              <TextareaBox
                label="Description"
                name="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Col>
            {category === 'Home' &&
            <Col xs={24}>
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={{ showRemoveIcon: true }}
              action="/upload"
              onChange={handleImageChange}
              accept="image/*"
            >
              {newImage ? (
                <img src={newImage} alt="Selected" width={80} />
              ) : (
                <div>
                  <UploadOutlined /> Upload Home Image
                </div>
              )}
            </Upload>
          </Col>
            }
          </Row>
        </Modal>
      
    </>
  );
}
