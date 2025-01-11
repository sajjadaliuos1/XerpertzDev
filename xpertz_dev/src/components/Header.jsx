import React from "react";
import { Layout, Menu } from "antd";
import logo from "../assets/images/logo.png"; // Adjust the path to the actual location of your logo

const { Header } = Layout;

const items = [
  { key: "1", label: <a href="#hero_section">Home</a> },
  { key: "2", label: <a href="#aboutUs">About Us</a> },
  { key: "3", label: <a href="#service">Services</a> },
  { key: "4", label: <a href="#gallery-1">Portfolio</a> },
  { key: "5", label: <a href="#domain">Domains/Hosting</a> },
  { key: "6", label: <a href="#sms">Business SMS</a> },
  { key: "7", label: <a href="#team">Team</a> },
  { key: "8", label: <a href="#contact">Contact</a> },
];

export default function Header_dev() {
  return (
    <Header
      id="header_wrapper"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white", // Transparent background
        borderBottom: "1px solid #ddd",
        marginBottom:"0px" // Optional border
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <div className="logo" style={{ marginRight: "10px" }}>
          <a href="#">
            <img src={logo} alt="logo" style={{ height: "30px" }} />
          </a>
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start", // Align items to the start
            background: "transparent", // Remove menu background
            border: "none", // Remove default border
            fontSize: "10px", // Make menu font smaller
            padding: 0, // Remove default padding
          }}
        />
      </div>
    </Header>
  );
}
