import PropTypes from 'prop-types';
import { Modal, Row, Col, Upload, message, Button, Form } from 'antd';
import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import InputBox from './InputBox';
import TextareaBox from './TextareaBox';
import useDropdown from './Dropdown';

export default function HomeModel({ isModalVisible, handleCancel }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log('Form Values:', values); // Now values is being read
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
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      bodyStyle={{ padding: '20px' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: 'Home',
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

          {form.getFieldValue('category') !== 'team' && form.getFieldValue('category') !== 'ourclients' && (
            <Col xs={24}>
              <InputBox label="Title" name="title" placeholder="Title" />
            </Col>
          )}

          {form.getFieldValue('category') === 'domains' && (
            <Form.List name="features" initialValue={[{ feature: '' }]}> 
              {(fields, { add, remove }) => (
                fields.map(({ key, name, ...restField }) => (
                  <Col xs={24} key={key}>
                    <InputBox
                      {...restField}
                      label={`Feature ${key + 1}`}
                      name={[name, 'feature']}
                      placeholder="Enter Feature"
                      addonAfter={
                        <>
                          <Button type="text" icon={<PlusOutlined />} onClick={() => add()} style={{ marginRight: '8px' }} />
                          <Button type="text" icon={<MinusOutlined />} onClick={() => remove(name)} />
                        </>
                      }
                    />
                  </Col>
                ))
              )}
            </Form.List>
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

HomeModel.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
