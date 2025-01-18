import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState("1");

  useEffect(() => {
    const hash = window.location.hash;
    const matchingItem = items.find((item) => item.label.props.href === hash);

    if (matchingItem) {
      setDefaultSelectedKey(matchingItem.key);
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setDefaultSelectedKey("1");
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
        padding: "0 20px",
        height: "14%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div className="logo">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img src={logo} alt="logo" style={{ height: "60px", marginTop: "15px" }} />
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
                    if (item.key === "1") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      return;
                    }
                    e.preventDefault();
                    customScrollTo(item.label.props.href);
                    setDefaultSelectedKey(item.key);
                  }}
                  href={item.label.props.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
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
              fontSize: "14px",
              fontWeight: "600",
              padding: "10px 0",
              flex: 1,
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
                        if (item.key === "1") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          return;
                        }
                        e.preventDefault();
                        customScrollTo(item.label.props.href);
                        setDefaultSelectedKey(item.key);
                        closeDrawer();
                      }}
                      href={item.label.props.href}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
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

<Button
  type="primary"
  icon={<SettingOutlined style={{ color: "white" }} />}
  onClick={() => navigate("/admin")} // This should navigate correctly
  style={{
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "blue",
    borderColor: "blue",
    color: "white",
  }}
>
  Admin Panel
</Button>

      </div>
    </Header>
  );
}
