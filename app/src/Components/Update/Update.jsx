import React from "react";
import { Form, Input, message ,Select,Radio,Button} from "antd";




function Update({employeeId}){

    

    const Finish = async (value) => {
        try {
           
            const { name, email, phone, designation, gender, course} = value
    
            const response = await fetch(`http://localhost:3000/Empolye_detials/${employeeId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, designation, gender, course }), // Convert updated data to JSON
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update employee with ID: ${employeeId}`);
            }
    
            const result = await response.json();
            console.log("Employee updated successfully:", result);
    
            // Optional: Update the state if needed
            // setEmployees((prevEmployees) =>
            //     prevEmployees.map((employee) =>
            //         employee._id === employeeId ? { ...employee, ...updatedData } : employee
            //     )
            // );
        } catch (error) {
            console.error("Error updating employee:", error.message);
        }
    };


    const FinishFailed = async ()=>{

        message.error("Enter valid information");

    }


    return(

        <>


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
  
                {/* <Form.Item
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
                </Form.Item> */}
  
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
        
        
        
        
        
        </>



    )



}


export default Update;