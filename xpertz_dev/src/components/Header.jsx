import React from "react";
import { Layout, Menu } from "antd";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from "../assets/images/logo.png"; 

const { Header } = Layout;

const items = [
  { key: "1", label: <Link to="/">Home</Link> }, // Update to Link
  { key: "2", label: <Link to="/about">About Us</Link> }, // Update to Link
  { key: "3", label: <Link to="/services">Services</Link> }, // Update to Link
  { key: "4", label: <Link to="/portfolio">Portfolio</Link> }, // Update to Link
  { key: "5", label: <Link to="/domain">Domains/Hosting</Link> }, // Update to Link
  { key: "6", label: <Link to="/business">Business SMS</Link> }, // Update to Link
  { key: "7", label: <Link to="/teams">Team</Link> }, // Update to Link
  { key: "8", label: <Link to="/contact">Contact</Link> }, // Update to Link
];

export default function Head() {
  return (
    <Header
      id="header_wrapper"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: "64px", marginLeft: "30px" }}
      >
        {/* Logo */}
        <div className="logo" style={{ marginLeft: "20px", marginTop: "20px" }}>
          <a href="https://xpertzdev.com/">
            <img src={logo} alt="logo" style={{ height: "40px" }} />
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
            justifyContent: "flex-start",
            background: "transparent",
            border: "none",
            fontSize: "10px",
            fontWeight: "bold", // Set font size directly here
            padding: 0,
          }}
        />
      </div>
    </Header>
  );
}
