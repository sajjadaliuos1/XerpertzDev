import React from 'react';
import { Modal, Row, Col, Upload, message, Button, Form } from 'antd';
import { UploadOutlined,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import InputBox from './InputBox';
import TextareaBox from './TextareaBox';
import useDropdown from './Dropdown';

export default function HomeModel({ isModalVisible, handleCancel }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm(); // Use Ant Design form

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const newData = {
          key: values.count,
          title: values.title,
          paragraph: values.paragraph,
          description: values.description,
          image: values.image || 'https://via.placeholder.com/100',
        };

        // Add new data to dataSource (implement this part if needed)
        message.success('Added successfully');
      })
      .catch(errorInfo => {
        console.log('Validate Failed:', errorInfo);
      });
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'done') {
      form.setFieldsValue({ image: file.response.url });
    }
  };

  return (
    <Modal
      title={'Add New ' + form.getFieldValue('category')}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      bodyStyle={{ padding: '20px' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: 'Home', // Default category
          count: 3,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <DropdownButton
              label="Select Category"
              placeholder="Select Page"
              style={{ width: '100%' }}
              onCategoryChange={value => form.setFieldsValue({ category: value })}
            />
          </Col>

          {/* Handle dynamic inputs based on selected category */}
          {(form.getFieldValue('category') !== 'team' && form.getFieldValue('category') !== 'ourclients') && (
            <Col xs={24}>
              <InputBox
                label="Title"
                name="title"
                placeholder="Title"
              />
            </Col>
          )}

          {form.getFieldValue('category') === 'ourclients' && (
            <>
              <Col xs={24}>
                <InputBox label="Client Name" name="clientName" placeholder="Client Name" />
              </Col>
              <Col xs={24}>
                <InputBox label="Url" name="url" placeholder="Url" />
              </Col>
            </>
          )}

          {form.getFieldValue('category') === 'team' && (
            <>
              <Col xs={24}>
                <InputBox label="Name" name="name" placeholder="Name" />
              </Col>
              <Col xs={24}>
                <InputBox label="Role" name="role" placeholder="Member Role" />
              </Col>
              <Col xs={24}>
                <InputBox label="Facebook Link" name="facebookLink" placeholder="Facebook Link" />
              </Col>
            </>
          )}
{form.getFieldValue('category') === 'domains' && (
            <>
         <Form.List name="features" initialValue={[{ feature: '' }]}>
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, fieldKey, ...restField }) => (
         <Col xs={24} key={key}>
        
          <InputBox
            {...restField}
            label={`Feature ${key + 1}`}
            name={[name, 'feature']}
            placeholder="Enter Feature"
            style={{ marginRight: 'px' }}
            addonAfter={
              <>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                  style={{ marginRight: '8px' }} // Space between Plus and Minus buttons
                />
                <Button
                  type="text"
                  icon={<MinusOutlined />} // Icon for the remove button
                  onClick={() => remove(name)} // Remove the current field
                />
              </>
            }
          />
        </Col>
      ))}
    </>
  )}
</Form.List>

            </>
          )}


          {(form.getFieldValue('category') !== 'aboutus' && form.getFieldValue('category') !== 'services' && 
          form.getFieldValue('category') !== 'portfolio' && form.getFieldValue('category') !== 'domains' &&
          form.getFieldValue('category') !== 'business' && form.getFieldValue('category') !== 'team' &&
          form.getFieldValue('category') !== 'ourclients') && (
            <Col xs={24}>
              <InputBox label="Paragraph" name="paragraph" placeholder="Paragraph" />
            </Col>
          )}

          <Col xs={24}>
            {(form.getFieldValue('category') !== 'domains' && form.getFieldValue('category') !== 'team' && 
            form.getFieldValue('category') !== 'ourclients') && (
              <TextareaBox label="Description" name="description" placeholder="Description" />
            )}
          </Col>

          {form.getFieldValue('category') === 'business' && (
            <>
              <Col xs={24}>
                <InputBox label="Bundle Price" name="bundlePrice" placeholder="Bundle Price" />
              </Col>
              <Col xs={24}>
                <InputBox label="Rate/SMS" name="rateSMS" placeholder="Rate / SMS" />
              </Col>
            </>
          )}

          {form.getFieldValue('category') === 'services' && (
            <Col xs={24}>
              <InputBox label="Icon Title" name="iconTitle" placeholder="Icon Title" />
            </Col>
          )}

          {(form.getFieldValue('category') !== 'domains' && form.getFieldValue('category') !== 'business') && (
            <Col xs={24}>
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
          )}
        </Row>
      </Form>
    </Modal>
  );
}
