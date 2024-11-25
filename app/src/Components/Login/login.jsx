import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import BackgorundImage from  "../Login/backgroundimg-loginpage.jpg"

import { useNavigate } from "react-router-dom";
const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // Function to handle form submission
  const onFinish = async (values) => {
    const { username, password } = values;


    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/Username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName:username, PassWord:password }),
      });

      const data = await response.json();

      console.log(data)

      if (response.ok) {
        message.success("Login successful!");

        navigate("/HomePage")
        
        console.log("User data:", data);
      } else {
        message.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please complete all required fields!");
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundImage: `url(${BackgorundImage})`, // Correct syntax for background image
        // backgroundSize: "cover", // Make sure the background image covers the screen
        // backgroundPosition: "center", // Center the background image
      }}
    >
      <div
        style={{
          padding: "4rem",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "600px",
        }}
      >
        <Title level={7} style={{ textAlign: "center", marginBottom: "2rem" }}>
          Admin Login 
        </Title>
        <Form
          name="loginForm"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
        
            label="Username"
            name="username"
            rules={[    
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ marginTop: "1rem" }}
            >
              Log In
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" style={{ padding: 0 }}>
              Forgot password?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
