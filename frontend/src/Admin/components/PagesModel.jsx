import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Row, Col, Button, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, MinusOutlined, UploadOutlined } from '@ant-design/icons';
import useDropdown from './Dropdown'; // Ensure this is properly imported
import { addHome } from '../../Api/home';
export default function PagesModel({ isModalVisible, handleCancel }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  // Handle Image Upload
  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const uploadedImageUrl = info.file.response?.url; // Get URL from response
      setImageUrl(uploadedImageUrl);
      form.setFieldsValue({ image: uploadedImageUrl });
      message.success('Image uploaded successfully!');
    }
  };

  // Handle form submission
  const handleFinish = async (values) => {
    console.log('Form Submitted with values:', values);

   try {
               let response = await addHome(values);
       
               if (!response.ok) {
                   let result = await response.json();
                  
                   throw new Error(result.error || "added failed.");
               }
       
              
               message.success('added success...');
               form.resetFields();
               
       
           } catch (error) {
               message.error(error.message);
           }
  };

  return (
    <Modal
      title={'Add New ' + (form.getFieldValue('category') || 'Page')}
      open={isModalVisible}
      onCancel={handleCancel}
      width="50%"
      bodyStyle={{ padding: '20px' }}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          category: 'Home',
          title: '',
          paragraph: '',
          description: '',
          features: [{ feature: '' }],
          image: '',
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Category Dropdown */}
          <Col xs={24}>
            <DropdownButton
              label="Select Category"
              placeholder="Select Page"
              style={{ width: '100%' }}
              onCategoryChange={(value) => {
                form.setFieldsValue({ category: value });
                console.log('Category selected:', value);
              }}
            />
          </Col>

          {/* Title Field */}
          {form.getFieldValue('category') !== 'team' &&
            form.getFieldValue('category') !== 'ourclients' && (
              <Col xs={24}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title!' }]}>
                  <Input placeholder="Enter Title" />
                </Form.Item>
              </Col>
            )}

          {/* Dynamic Features List */}
          {form.getFieldValue('category') === 'domains' && (
            <Col xs={24}>
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={8} align="middle">
                        <Col flex="auto">
                          <Form.Item
                            {...restField}
                            name={[name, 'feature']}
                            label={`Feature ${key + 1}`}
                            rules={[{ required: true, message: 'Enter a feature' }]}
                          >
                            <Input placeholder="Enter Feature" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Button type="text" icon={<MinusOutlined />} onClick={() => remove(name)} danger />
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                      Add Feature
                    </Button>
                  </>
                )}
              </Form.List>
            </Col>
          )}

          {/* Paragraph Field */}
          {!['aboutus', 'services', 'portfolio', 'domains', 'business', 'team', 'ourclients'].includes(
            form.getFieldValue('category')
          ) && (
            <Col xs={24}>
              <Form.Item name="paragraph" label="Paragraph">
                <Input.TextArea placeholder="Enter Paragraph" />
              </Form.Item>
            </Col>
          )}

          {/* Description Field */}
          {!['domains', 'team', 'ourclients'].includes(form.getFieldValue('category')) && (
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter Description" />
              </Form.Item>
            </Col>
          )}

          {/* Image Upload Field with Preview */}
          <Col xs={24}>
            <Form.Item name="image" label="Upload Image">
              <Row gutter={16} align="middle">
                {/* Upload Button */}
                <Col>
                <Upload
                name="image"
                listType="picture-card"
                showUploadList={{ showRemoveIcon: true }}
                action="/upload"
                onChange={handleImageChange}
                accept="image/*"
              >
                {form.getFieldValue('image') ? (
                  <img src={form.getFieldValue('image')} alt="Selected" width={80} />
                ) : (
                  <div>
                    <UploadOutlined /> Upload Image
                  </div>
                )}
              </Upload>
                </Col>

                {/* Image Preview */}
                {imageUrl && (
                  <Col>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      style={{ width: 100, height: 100, borderRadius: 8 }}
                    />
                  </Col>
                )}
              </Row>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

PagesModel.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
