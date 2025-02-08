import PropTypes from "prop-types";
import { useState } from "react";
import { Modal, Row, Col, Button, Form, Input, Upload, message } from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import useDropdown from "./Dropdown";
import { addHome } from "../../Api/home";

export default function PagesModel({ isModalVisible, handleCancel }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState('home');

  const handleImageChange = ({ fileList: newFileList }) => {
    // Limit to only one file if needed
    setFileList(newFileList);
  };

  // Handle Form Submission
  const handleFinish = async (values) => {
    if (fileList.length < 1) {
      message.error("Please upload an image!");
      return true;
    }

    const payload = new FormData();
    payload.append("category", category);
    payload.append("title", values?.title ?? "");
    payload.append("paragraph", values?.paragraph ?? "");
    payload.append("description", values?.description ?? "");
    console.log(values)
    // Handle multiple files if needed
    fileList.forEach((file, index) => {
      if (file.originFileObj) {
        payload.append(`image`, file.originFileObj);
      }
    });
    try {
      const response = await addHome(payload);
      
      // Assuming response is a Response object
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Home Adding failed.");
      }

      message.success("Home Added successfully!");
      form.resetFields();
      setFileList([]); // Reset file list
      handleCancel(); // Close modal after success
    } catch (error) {
      message.error(error.message || "An error occurred while adding the page.");
    }
  };

  // Configuration for image upload
  const uploadProps = {
    beforeUpload: (file) => {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      // Validate file size (e.g., 5MB limit)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return false; // Prevent automatic upload
    },
    fileList,
    onChange: handleImageChange,
    multiple: false, // Set to true if you want to allow multiple files
  };

  return (
    <Modal
      title={`Add New ${form.getFieldValue("category") || "Page"}`}
      open={isModalVisible}
      onCancel={handleCancel}
      width="50%"
      bodyStyle={{ padding: "20px" }}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          category: "Home",
          title: "",
          paragraph: "",
          description: "",
          features: [{ feature: "" }],
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Category Dropdown */}
          <Col xs={24}>
            <DropdownButton
              name="category"
              label="Select Category"
              placeholder="Select Page"
              style={{ width: "100%" }}
              onCategoryChange={(value) => {
                setCategory(value)
              }}
            />
          </Col>

          {/* Title Field */}
          {form.getFieldValue("category") !== "team" &&
            form.getFieldValue("category") !== "ourclients" && (
              <Col xs={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: "Please enter a title!" }]}
                >
                  <Input placeholder="Enter Title" />
                </Form.Item>
              </Col>
            )}

          {/* Dynamic Features List */}
          {form.getFieldValue("category") === "domains" && (
            <Col xs={24}>
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={8} align="middle">
                        <Col flex="auto">
                          <Form.Item
                            {...restField}
                            name={[name, "feature"]}
                            label={`Feature ${key + 1}`}
                            rules={[{ required: true, message: "Enter a feature" }]}
                          >
                            <Input placeholder="Enter Feature" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Button
                            type="text"
                            icon={<MinusOutlined />}
                            onClick={() => remove(name)}
                            danger
                          />
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
          {!["aboutus", "services", "portfolio", "domains", "business", "team", "ourclients"].includes(
            form.getFieldValue("category")
          ) && (
            <Col xs={24}>
              <Form.Item name="paragraph" label="Paragraph">
                <Input.TextArea placeholder="Enter Paragraph" />
              </Form.Item>
            </Col>
          )}

          {/* Description Field */}
          {!["domains", "team", "ourclients"].includes(form.getFieldValue("category")) && (
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter Description" />
              </Form.Item>
            </Col>
          )}

          {/* Image Upload Field with Preview */}
          <Col xs={24}>
            <Form.Item
              label="Upload Image"
              required
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                {...uploadProps}
                listType="picture-card"
              >
                {fileList.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
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