import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form, Input, Upload, message } from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import useDropdown from "./Dropdown";
import { addHome, updateHome, getHomeById } from "../../Api/Home";
import { addAbout, updateAbout } from "../../Api/About";
import { addServices, updateServices, addPortfolio, updatePortfolio, addDomain } from "../../Api/PagesApi";

export default function PagesModel({ isModalVisible, handleCancel, initialData, refreshData }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState('home');
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(initialData);

  // Load initial data when editing
  useEffect(() => {
    const fetchData = async () => {
      if (initialData) {
        setLoading(true);
        try {
          const response = await getHomeById(initialData);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }

          const data = await response.json();

          form.setFieldsValue({
            title: data.title || "",
            paragraph: data.paragraph || "",
            description: data.description || "",
            features: data.features || [{ feature: "" }],
            category: data.category || "home"
          });

          setCategory(data.category?.toLowerCase() || 'home');

          if (data._id) {
            setFileList([{
              uid: '-1',
              name: 'Current Image',
              status: 'done',
              url: `http://localhost:5000/api/img/${data._id}`
            }]);
          }
        } catch (error) {
          console.error('Error fetching record:', error);
          message.error('Failed to fetch record details. Please try again.');
          handleCancel();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [initialData, form, handleCancel]);

  // Reset form when category changes (only for new records)
  useEffect(() => {
    if (!initialData) {
      form.setFieldsValue({
        title: "",
        paragraph: "",
        description: "",
        features: [{ feature: "" }]
      });
    }
  }, [category, form, initialData]);

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleFinish = async (values) => {
    console.log(values);
    if (!isEditing && fileList.length < 1) {
      message.error("Please upload an image!");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    payload.append("category", category);
    payload.append("title", values?.title ?? "");

    if (category.toLowerCase() === "portfolio") {
      payload.append("githuburl", values?.GitHubUrl ?? "");  // Fix field name
      payload.append("livedemo", values?.LiveDemo ?? "");  // Fix field name
    } else if (category.toLowerCase() === "domains") {
      // Collect domain features
      payload.append("features", JSON.stringify(values?.features ?? []));

    } else {
      payload.append("paragraph", values?.paragraph ?? "");
    }

    payload.append("description", values?.description ?? "");

    fileList.forEach((file) => {
      if (file.originFileObj) {
        payload.append("image", file.originFileObj);
      }
    });

    console.log("Payload Data Before Sending:", Object.fromEntries(payload.entries())); // Debugging

    try {
      let response;
      if (category.toLowerCase() === "portfolio") {
        response = isEditing ? await updatePortfolio(initialData, payload) : await addPortfolio(payload);
      } else if (category.toLowerCase() === "aboutus") {
        response = isEditing ? await updateAbout(initialData, payload) : await addAbout(payload);
      } else if (category.toLowerCase() === "services") {
        response = isEditing ? await updateServices(initialData, payload) : await addServices(payload);
      } else if (category.toLowerCase() === "domains") {
        response =  addDomain(payload);
        console.log("domain", response);
      } else {
        response = isEditing ? await updateHome(initialData, payload) : await addHome(payload);
      }

      const result = await response.json();

      if (!response.ok) {
        console.error("Backend Error:", result);
        throw new Error(result.error || "Operation failed.");
      }

      message.success(`${isEditing ? "Updated" : "Added"} successfully!`);
      form.resetFields();
      setFileList([]);
      refreshData();
      handleCancel();
    } catch (error) {
      console.error("Operation error:", error);
      message.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    fileList,
    onChange: handleImageChange,
    multiple: false,
  };

  const shouldShowTitle = () => {
    return !["team", "ourclients"].includes(category.toLowerCase());
  };

  const shouldShowParagraph = () => {
    return ![ "services", "portfolio", "domains", "business", "team", "ourclients"].includes(
      category.toLowerCase()
    );
  };

  const shouldShowDescription = () => {
    return !["domains","aboutus", "team", "ourclients"].includes(category.toLowerCase());
  };

  return (
    <Modal
      title={`${isEditing ? 'Edit' : 'Add New'} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
      open={isModalVisible}
      onCancel={handleCancel}
      width="50%"
      bodyStyle={{ padding: "20px" }}
      footer={null}
      confirmLoading={loading}
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
          <Col xs={24}>
            <DropdownButton
              name="category"
              label="Select Category"
              placeholder="Select Page"
              style={{ width: "100%" }}
              onCategoryChange={setCategory}
              defaultValue={category}
            />
          </Col>

          {shouldShowTitle() && (
            <Col xs={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter a title!" }]} >
                <Input placeholder="Enter Title" />
              </Form.Item>
            </Col>
          )}

          {category.toLowerCase() === "portfolio" && (
            <Col xs={24}>
              <Form.Item name="GitHubUrl" label="GitHub Url">
                <Input placeholder="Enter GitHub Url" />
              </Form.Item>
              <Form.Item name="LiveDemo" label="Live Demo">
                <Input placeholder="Enter Live Demo" />
              </Form.Item>
            </Col>
          )}

          {category.toLowerCase() === "domains" && (
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
                            rules={[{ required: true, message: "Enter a feature" }]} >
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

          {shouldShowParagraph() && (
            <Col xs={24}>
              <Form.Item name="paragraph" label="Paragraph">
                <Input.TextArea placeholder="Enter Paragraph" />
              </Form.Item>
            </Col>
          )}

          {shouldShowDescription() && (
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter Description" />
              </Form.Item>
            </Col>
          )}

          {category.toLowerCase() !== "domains" && (
            <Col xs={24}>
             <Form.Item label="Upload Image">
              <Upload
                {...uploadProps}
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
              >
                {fileList.length < 1 && category.toLowerCase() !== "domains" && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            </Col>
          )}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}>
              {isEditing ? 'Update' : 'Submit'}
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
  initialData: PropTypes.string,
  refreshData: PropTypes.func.isRequired,
};
