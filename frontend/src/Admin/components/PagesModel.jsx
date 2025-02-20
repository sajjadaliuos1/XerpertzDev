import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form, Input, Upload, message } from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import useDropdown from "./Dropdown";
import { addHome, updateHome, getHomeById } from "../../Api/Home";
import { addAbout, updateAbout } from "../../Api/About";
import { addServices, updateServices, addPortfolio, updatePortfolio, addDomain, updateDomain, addTeam, updateTeam } from "../../Api/PagesApi";

export default function PagesModel({ isModalVisible, handleCancel, initialData, refreshData }) {
  const { DropdownButton } = useDropdown();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState('home');
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(initialData);

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
            githuburl: data.githuburl || "",
            livedemo: data.livedemo || "",
            name: data.name || "",
            role: data.role || "",
            fblink: data.fblink || "",
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

  useEffect(() => {
    if (!initialData) {
      form.setFieldsValue({
        title: "",
        paragraph: "",
        description: "",
        githuburl:"",
        livedemo:"",
        name:"",
        role:"",
        fblink:"",
        features: [{ feature: "" }]
      });
    }
  }, [category, form, initialData]);

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleFinish = async (values) => {
    if (category.toLowerCase() === "team" && fileList.length < 1) {
      message.error("Please upload an image for the team member!");
      return;
    }
  
    console.log("Form Submitted Values:", values); // Debugging log
  
    setLoading(true);
    const payload = new FormData();
    payload.append("category", category);
    payload.append("title", values.title || "");
    payload.append("paragraph", values.paragraph || "");
    payload.append("description", values.description || "");
  
    // Explicitly append GitHubUrl and LiveDemo for portfolio category
    if (category.toLowerCase() === "portfolio") {
      payload.append("githuburl", values.githuburl || "");  
      payload.append("livedemo", values.livedemo || "");  
    }
    if (category.toLowerCase() === "domains") {
      // Make sure features is properly formatted
      const featuresArray = values.features 
        ? values.features.map(f => f.feature).filter(feature => feature.trim() !== "")
        : [];
      
      payload.append("features", JSON.stringify(featuresArray));
    }
    
    
    
    if (category.toLowerCase() === "team") {
      payload.append("name", values.name || "");
      payload.append("role", values.role || "");
      payload.append("fblink", values.fblink || "");
    }
  
    fileList.forEach((file) => {
      if (file.originFileObj) {
        payload.append("image", file.originFileObj);
      }
    });
  
    try {
      let response;
      switch (category.toLowerCase()) {
        case "portfolio":
          response = isEditing ? await updatePortfolio(initialData, payload) : await addPortfolio(payload);
          break;
        case "aboutus":
          response = isEditing ? await updateAbout(initialData, payload) : await addAbout(payload);
          break;
        case "services":
          response = isEditing ? await updateServices(initialData, payload) : await addServices(payload);
          break;
        case "team":
          response = isEditing ? await updateTeam(initialData, payload) : await addTeam(payload);
          break;
        case "domains":
          response = isEditing ? await updateDomain(initialData, payload) : await addDomain(payload);
          console.log(response);
          break;
        default:
          response = isEditing ? await updateHome(initialData, payload) : await addHome(payload);
      }
  
      if (!response.ok) throw new Error("Operation failed.");
      message.success(`${isEditing ? "Updated" : "Added"} successfully!`);
      form.resetFields();
      setFileList([]);
      refreshData();
      handleCancel();
    } catch (error) {
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
          githuburl:"",
          livedemo:"",
          name:"",
          fblink:"",
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
              <Form.Item name="githuburl" label="GitHub Url">
                <Input placeholder="Enter GitHub Url" />
              </Form.Item>
              <Form.Item name="livedemo" label="Live Demo">
                <Input placeholder="Enter Live Demo" />
              </Form.Item>
            </Col>
          )}
           {category.toLowerCase() === "team" && (
            <Col xs={24}>
              <Form.Item name="name" label="Name">
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item name="role" label="Role">
                <Input placeholder="Enter Role" />
              </Form.Item>
              <Form.Item name="fblink" label="Facebook link">
                <Input placeholder="Enter Facebook link" />
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
                          <Form.Item {...restField} name={[name, "feature"]} label={`Feature ${key + 1}`} rules={[{ required: true, message: "Enter a feature" }]}>
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
