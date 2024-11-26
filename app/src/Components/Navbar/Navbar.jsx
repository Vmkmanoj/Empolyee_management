import React from "react";
import { Row, Col, Card, Button } from "antd"; // Ant Design components for better layout
import "./Navbar.css";

import { Navigate, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("token");
      navigate("/");
  };
  



  return (
    <div className="home-container">
      <Row gutter={16} justify="space-between" align="middle">
        {/* First Column */}
        <Col xs={24} sm={12} lg={7}>
          <Card className="card" hoverable>
            <h1 className="card-title" onClick={()=>navigate("/HomePage")}>Home</h1>
          </Card>
        </Col>

        {/* Second Column */}
        <Col xs={24} sm={12} lg={7}>
          <Card className="card" hoverable>
            <h1 className="card-title" onClick={()=>navigate("/EmpolyeeList")}>Employee List</h1>
          </Card>
        </Col>

        {/* Third Column */}
        <Col xs={24} sm={12} lg={7}>
          <Card className="card" >
            <h1  className="card-title ml-28">WelCome ...! admin</h1>
          </Card>
        </Col>

        {/* Log Out Button */}
        <Col xs={24} sm={12} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" size="large" className="log-out-btn" onClick={()=>logout()}>Log Out</Button>
        </Col>
      </Row>
    </div>
  );
}

export default NavBar;
