import {
    Button,Form,Input,message,Radio,
    Select,
    Upload,
  } from "antd";
  import { PlusOutlined } from "@ant-design/icons";
  import React, { useState } from "react";

  import EmpolyeInformation from "../Empolyinfo/EmpolyeInfomation";
  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  const Finish = async (value) => {
    const { name, email, phone, designation, gender, course } = value;


  


    console.log(name, email, phone, designation, gender, course );

    if (!name || !email || !phone || !designation || !gender || !course ) {
        message.error("All fields are required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/Information", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, designation, gender, course }),
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log("Success:", data);
        } else {
            console.error("Failed to submit:", response.statusText);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
    }



  
  const FinishFailed = () => {
    message.error("Please enter valid information!");
  };
  
  function Empole() {
    const [count,setCount] = useState(0)
    const [create, setCreate] = useState("CreateEmpolye");
  
    const EmpolyehandleChange = () => {
      setCreate((e) => (e === "CreateEmpolye" ? "ShowEmploye" : "CreateEmpolye"));
    };
  
    return (
      <>
        {/* Header Section */}
        <div className="flex flex-col">
          <div className="h-24 w-full bg-blue-600 flex items-center mt-2 px-8">
            <h1 className="text-white text-2xl font-semibold">Employee Management</h1>
          </div>
          <div className="flex justify-between px-10 py-6 bg-gray-100">
            <h1 className="text-lg font-medium">{create==="CreateEmpolye"?"":(<span>Total Employees: {count}</span>)}</h1>
            <Button
              type="primary"
              onClick={EmpolyehandleChange}
              style={{ fontWeight: "bold" }}
            >
              {create}
            </Button>
          </div>
        </div>
  
        {/* Dynamic Form Section */}
        <div className="p-10 bg-gray-50">
          {create === "CreateEmpolye" ? (
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-xl font-semibold text-center mb-6">
                Create Employee
              </h2>
              <Form
                layout="vertical"
                name="employee_form"
                onFinish={Finish}
                onFinishFailed={FinishFailed}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input placeholder="Enter full name" />
                </Form.Item>
  
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { type: "email", message: "Please enter a valid email!" },
                    { required: true, message: "Email is required!" },
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
  
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "Phone number is required!" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
  
                <Form.Item
                  label="Designation"
                  name="designation"
                  rules={[
                    { required: true, message: "Please select a designation!" },
                  ]}
                >
                  <Select placeholder="Select designation">
                    <Select.Option value="HR">HR</Select.Option>
                    <Select.Option value="Manager">Manager</Select.Option>
                    <Select.Option value="Sales">Sales</Select.Option>
                  </Select>
                </Form.Item>
  
                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
  
                <Form.Item
                  label="Course"
                  name="course"
                  rules={[
                    { required: true, message: "Please select a course!" },
                  ]}
                >
                  <Select placeholder="Select a course">
                    <Select.Option value="MCA">MCA</Select.Option>
                    <Select.Option value="MBA">MBA</Select.Option>
                    <Select.Option value="BCA">BCA</Select.Option>
                  </Select>
                </Form.Item>
  
                <Form.Item
                  label="Upload Resume"
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ marginTop: "1rem", fontWeight: "bold" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
           <EmpolyeInformation  count = {count} setCount={setCount}></EmpolyeInformation>
          )}
        </div>
      </>
    );
  }
  
  export default Empole;
  