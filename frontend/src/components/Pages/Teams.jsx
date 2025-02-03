import React, { useState } from "react";
import { Card, Col, Row, Tooltip, Modal } from "antd";
import { Fade } from 'react-awesome-reveal';  
import { FacebookOutlined } from '@ant-design/icons'; // Importing official Facebook icon
import Haroon from "../../assets/images/Haroon.png";  // Correct path to image
import irfan from "../../assets/images/irfan.jpg";
import fayaz from "../../assets/images/fayaz.jpg";
import hassan from "../../assets/images/hassan.jpg";
import pmanjor from "../../assets/images/pmanjor.jpg";
import icon from "../../assets/images/icon.png"; // Ensure the correct path

const { Meta } = Card;

const teamMembers = [
  {
    name: "Haroon Yousaf",
    role: "Founder / CEO",
    imgSrc: Haroon, // Use the imported image directly
    fbLink: "https://www.facebook.com/Haroon0177",
  },
  {
    name: "Irfan Khan",
    role: "Web Designer",
    imgSrc: irfan,
    fbLink: "https://www.facebook.com/irfan.khan958",
  },
  {
    name: "Naeem Ahmad",
    role: "Graphics Designer",
    imgSrc: icon,
    fbLink: "https://www.facebook.com/profile.php?id=100029248564389",
  },
  {
    name: "Akmal Khan",
    role: "Senior Project Manager",
    imgSrc: pmanjor,
    fbLink: "https://www.facebook.com/akmal.crestech",
  },
  {
    name: "Fayaz Khan",
    role: "Senior Software Engineer",
    imgSrc: fayaz,
    fbLink: "https://www.facebook.com/fayazkyusufzai",
  },
  {
    name: "Abdul Aziz",
    role: "Software Engineer",
    imgSrc: icon, // Ensure correct image is assigned
    fbLink: "https://www.facebook.com/abaziz026",
  },
  {
    name: "Hassan Yousaf",
    role: "Marketing Manager",
    imgSrc: hassan,
    fbLink: "https://www.facebook.com/hassan.hassanyousaf.1",
  }
];

export default function Teams() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [currentImage, setCurrentImage] = useState(null); // State to store clicked image

  // Function to show image modal
  const handleImageClick = (image) => {
    setCurrentImage(image); // Set the clicked image to state
    setIsModalVisible(true); // Show the modal
  };

  // Function to close modal
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <section id="teams" className="page_section team" style={{
        padding: '70px',
      }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', color: '#1890ff' }}>Our Team</h1>
        
        <Row gutter={[10, 10]} justify="center">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}> 
              <Fade delay={index * 100}>
                <Card
                  hoverable
                  style={{
                    width: '100%', // Full width of the column
                    borderRadius: "10px", 
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    transition: "transform 0.3s ease-in-out",
                    textAlign: "center", // Centering text inside the card
                    backgroundColor: "#ffffff", // Clean white background
                    padding: "10px", // Extra padding for spacing
                  }}
                  cover={
                    <div 
                      style={{
                        overflow: 'hidden',
                      }}
                    >
                      <img 
                        alt={member.name} 
                        src={member.imgSrc} 
                        onClick={() => handleImageClick(member.imgSrc)} // Image click triggers modal
                        style={{
                          width: '180px',  // Fixed width for images
                          height: '180px', // Fixed height
                          objectFit: 'cover', // Ensuring the image fits its container
                          borderRadius: '10px', // Subtle rounded edges
                          margin: 'auto', // Centering the image
                          display: 'block', // Centering the image
                          cursor: 'pointer', // Change cursor to indicate clickable
                          transition: 'transform 0.3s ease-in-out', // Smooth animation
                        }} 
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} // Scale up on hover
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Scale back on leave
                      />
                    </div>
                  }
                  actions={[
                    <Tooltip title="Facebook">
                      <a href={member.fbLink} target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined style={{ fontSize: "24px", color: "#3b5998" }} />
                      </a>
                    </Tooltip>
                  ]}
                >
                  <Meta 
                    title={member.name} 
                    description={member.role} 
                    style={{ textAlign: 'center', fontWeight: "bold" }} // Styling Meta
                  />
                </Card>
              </Fade>
            </Col>
          ))}
        </Row>
        
        {/* Modal for image preview */}
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          width={300} // Adjust modal size
        >
          <img
            alt="Team Member"
            src={currentImage}
            style={{
              width: '100%', // Make sure the image takes the full modal width
              height: 'auto', // Maintain aspect ratio
              objectFit: 'contain', // Prevent image from getting cut off
            }}
          />
        </Modal>
      </div>
    </section>
  );
}
