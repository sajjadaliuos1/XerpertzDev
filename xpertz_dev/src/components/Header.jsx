import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button, Anchor } from "antd"; 
import { MenuOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";

const { Header } = Layout;

const items = [
  { key: "1", label: <a href="/">Home</a> },
  { key: "2", label: <a href="#aboutUs">About Us</a> },
  { key: "3", label: <a href="#services">Services</a> },
  { key: "4", label: <a href="#portfolio">Portfolio</a> },
  { key: "5", label: <a href="#domain">Domains/Hosting</a> },
  { key: "6", label: <a href="#business">Business SMS</a> },
  { key: "7", label: <a href="#teams">Team</a> },
  { key: "8", label: <a href="#clients">Our Clients</a> },
  { key: "9", label: <a href="#contact">Contact</a> },
];

export default function Head() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState("1");

  useEffect(() => {
    // Set the default selected key based on the current URL hash
    const hash = window.location.hash;
    const matchingItem = items.find((item) => item.label.props.href === hash);
    if (matchingItem) {
      setDefaultSelectedKey(matchingItem.key);
    } else {
      setDefaultSelectedKey("1"); // Default to Home if no hash is present
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  // Smooth scrolling
  const customScrollTo = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        top: 0,
        left: 0,
        padding: 0,
        height: "15%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 20px",
        }}
      >
        <div className="logo" style={{ marginRight: "40px" }}>
          <a href="/">
            <img src={logo} alt="logo" style={{ height: "60px" }} />
          </a>
        </div>

        {!isMobile ? (
          <Menu
            mode="horizontal"
            selectedKeys={[defaultSelectedKey]}
            items={items.map((item) => ({
              ...item,
              label: (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    customScrollTo(item.label.props.href);
                    setDefaultSelectedKey(item.key);
                  }}
                  href={item.label.props.href}
                >
                  {item.label.props.children}
                </a>
              ),
            }))}
            style={{
              display: "flex",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              fontSize: "18px",
              fontWeight: "bold",
              padding: 0,
            }}
          />
        ) : (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              style={{ fontSize: "30px", fontWeight: "bold" }}
            />
            <Drawer
              title={<img src={logo} alt="logo" style={{ height: "40px" }} />}
              placement="right"
              onClose={closeDrawer}
              open={isDrawerVisible}
              width={250}
            >
              <Menu
                mode="inline"
                selectedKeys={[defaultSelectedKey]}
                items={items.map((item) => ({
                  ...item,
                  label: (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        customScrollTo(item.label.props.href);
                        setDefaultSelectedKey(item.key);
                        closeDrawer();
                      }}
                      href={item.label.props.href}
                    >
                      {item.label.props.children}
                    </a>
                  ),
                }))}
                style={{
                  border: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Drawer>
          </>
        )}
      </div>
    </Header>
  );
}
