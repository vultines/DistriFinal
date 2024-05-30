import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getAllEmployees } from "@/pages/api/backend.api";
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";

interface LoginPageProps {
    loginCallback: () => void;
  }

const FormData = ({onLogin} : {onLogin:boolean}) => {

    const [employeeAll, setEmployee] = useState([]);

    useEffect(() => {
        async function loadData(){
            const res = await getAllEmployees();
            console.log(res);
            setEmployee(res.data);
        }
        loadData();
    })

    const router = useRouter();

    const handleLogin = ({ email, password }: { email: string, password: string }) => {
        

        const employee = employeeAll.find((employee) => employee.email === email && employee.password === password);
        if (employee) {
          // Employee found, proceed with login
          console.log('Login successful');
          onLogin=true;
          router.push('/'); // Replace '/home' with the actual route to your home page
          
        } else {
          // Invalid email or password
          console.log('Invalid email or password');
        }
      };

    return (
        
        <div className="loginMainContainer flex flex-row">
            
            <div className="loginSecondContainer flex flex-row">
            <div className="loginContainer">
                <div className="loginTitle">
                    Iniciar Sesión.
                </div>
                <div className="logInSubContainer" >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Por favor ingrese su email!" }]}
                        >
                           
                            <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Por favor ingrese su contraseña!" }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Contraseña"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="" color="white">
                                Olvidaste tu contraseña?
                            </a>
                        </Form.Item>
                    
                        <Form.Item>
                            <Button
                            htmlType="submit"
                            className="login-form-button justify-center"
                            
                            style={{backgroundColor: "#FE7C56", color: "white", width: "100%", height: "50px", borderRadius: "5px",
                                fontFamily: "Century Gothic", fontSize: "25px", fontWeight: "bold"}}>
                            Iniciar Sesión
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="loginPicContainer">
                <div className="loginPicBox">
                    <h1>Centros Infantiles</h1>
                </div>
            </div>
            </div>
            
            <div id="circle-orbit-container">
                <div id="inner-orbit">
                <div className="inner-orbit-cirlces">
                </div>
                </div>

                <div id="middle-orbit">
                <div className="middle-orbit-cirlces">
                </div>
                </div>

                <div id="outer-orbit">
                <div className="outer-orbit-cirlces">
                </div>
                </div>
            </div>

        </div>
    );
};

export default FormData;