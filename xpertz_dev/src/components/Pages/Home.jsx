import React from "react";
import { Button } from "antd"; 
import workspace from "../../assets/images/workspace.png"; 


export default function Home_xpertzdev() {
  return (
    
    <section
      id="hero_section"
      className="top_cont_outer"
      style={{
        backgroundColor: "#007bff", 
        padding: "50px 0", 
        color: "white", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        height: "100vh",
      
      }}
    >
      <div className="hero_wrapper" style={{ width: "100%", display: "flex" }}>
        {/* Text Section */}
        <div
          className="text-section"
          style={{
            flex: 1, // Occupy equal width as image section
            paddingLeft: "50px", // Padding for better spacing on the left
          }}
        >
          <div className="top_left_cont zoomIn wow animated">
            <h2>
              The <strong>BEST</strong> IT Solution in Swat.
            </h2>
            <p>We Deliver Products in Responsive Way</p>
            <ul className="list-unstyled">
              <li>
                <span className="fa fa-asterisk"></span> Your Success is Our
                Success
              </li>
              <li>
                <span className="fa fa-asterisk"></span> Passionate about
                Software Development
              </li>
              <li>
                <span className="fa fa-asterisk"></span> We are Listening, We
                are Together
              </li>
              <li>
                <span className="fa fa-asterisk"></span> One Website that fits
                all screen sizes
              </li>
            </ul>

            {/* Ant Design Button with Link */}
            <a href="#service">
              <Button
                type="primary"
                icon={<span className="fa fa-eye"></span>}
                style={{
                  marginTop: "10px", 
                  backgroundColor: "white",
                  color: "#007bff", 
                  border: "none", 
                  padding: "10px 20px",
                }}
              >
                Read More
              </Button>
            </a>
          </div>
        </div>

        {/* Workspace Image Section */}
        <div
          className="image-section"
          style={{
            flex: 1, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            paddingRight: "50px",
          }}
        >
          <img
            src={workspace}
            className="zoomIn wow animated"
            alt="Workspace"
            style={{
              width: "100%", 
              objectFit: "contain", 
            }}
          />
        </div>
      </div>
    </section>
  );
}
