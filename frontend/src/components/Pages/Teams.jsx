import { useEffect, useState } from "react";
import { Card, Col, Row, Tooltip, Modal, message } from "antd";
import { Fade } from "react-awesome-reveal";
import { FacebookOutlined } from "@ant-design/icons";
import { homeDetails } from "../../Api/Home";

const { Meta } = Card;

export default function Teams() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchPagesDetails = async () => {
      try {
        const response = await homeDetails();
        const result = await response.json();
        console.log("API Response:", result);

        if (result && Array.isArray(result.teampage)) {
          setTeam(result.teampage);
        } else {
          console.error("Unexpected API response:", result);
          message.error("Invalid API response format");
        }
      } catch (error) {
        message.error("Failed to fetch data");
        console.error("Fetch error:", error);
      }
    };

    fetchPagesDetails();
  }, []);

  const handleImageClick = (imageId) => {
    setCurrentImage(`http://localhost:5000/api/img/${imageId}`);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section id="teams" className="page_section team" style={{ padding: "70px" }}>
      <div className="container">
        <h1 style={{ textAlign: "center", color: "#1890ff" }}>Our Team</h1>

        <Row gutter={[10, 10]} justify="center">
          {team.map((member) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={member._id}>
              <Fade delay={100}>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    padding: "10px",
                  }}
                  cover={
                    <div style={{ overflow: "hidden" }}>
                      <img
                        alt={member.name}
                        src={`http://localhost:5000/api/img/${member._id}`}
                        onClick={() => handleImageClick(member._id)}
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          margin: "auto",
                          display: "block",
                          cursor: "pointer",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                      />
                    </div>
                  }
                  actions={[
                    // eslint-disable-next-line react/jsx-key
                    <Tooltip title="Facebook">
                      <a href={member.fbLink} target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined style={{ fontSize: "24px", color: "#3b5998" }} />
                      </a>
                    </Tooltip>,
                  ]}
                >
                  <Meta title={member.name} description={member.role} style={{ textAlign: "center", fontWeight: "bold" }} />
                </Card>
              </Fade>
            </Col>
          ))}
        </Row>

        {/* Modal for image preview */}
        <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} width={300}>
          <img
            alt="Team Member"
            src={currentImage}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Modal>
      </div>
    </section>
  );
}
