import { useState, useEffect } from "react";
import { Typography, Row, Col, Image, message } from "antd";
import { homeDetails } from "../../Api/Home";

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  const [data, setData] = useState(null);

  const fetchPagesDetails = async () => {
    try {
      const response = await homeDetails();
      const result = await response.json();

      console.log("Full API Response:", result); // Debugging

      // Access 'aboutpage' correctly
      const aboutData = result?.aboutpage?.length > 0 ? result.aboutpage[0] : null;

      console.log("Filtered About Data:", aboutData); // Debugging

      setData(aboutData);
    } catch (error) {
      message.error("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPagesDetails();
  }, []);

  return (
    <section id="aboutUs" style={{ paddingTop: "60px" }}>
      {/* Title */}
      <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
      About Us
      </Title>

      {/* Inner Section */}
      <Row gutter={[16, 16]} align="middle">
        {/* Text Section - Left */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <div style={{ padding: 10, backgroundColor: "#f7f7f7", borderRadius: 10 }}>
            <Title level={4} style={{ marginBottom: "10px" }}>
           
              {data ? data.title : "Loading..."}
            </Title>
            <Paragraph style={{ marginBottom: "10px", fontSize: "18px" }}>
              {data ? data.paragraph : "Loading..."}
            </Paragraph>
          </div>
        </Col>

        {/* Image Section - Right */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Image
            src={data?.image ? `http://localhost:5000/api/img/${data._id}` : "default-image.jpg"}
            alt="About Us"
            style={{ width: "100%", borderRadius: 10 }}
          />
        </Col>
      </Row>
    </section>
  );
}
