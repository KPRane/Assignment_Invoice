import React, { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../config/MyService";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const login = (event) => {
        event.preventDefault();
        userLogin(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert(res.data.message);
                navigate("/dashboard");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else if (res.data.err === 0) {
                alert(res.data.message);
            }
        });
    };

    return (
        <div
           
        > <br /> <br /> <br />
            <Container className=" col-6 container" style={{ backgroundColor: "#CEE5D0" }}>
                <br />  <br />
               
                    <h2 className="text-center text-uppercase display-5">Login </h2> <br /><br />
                    <Form
                         className=" col-10 container"
                        onSubmit={(e) => login(e)}
                    >
                        <Form.Group>
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                onChange={handler}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handler}
                            />
                        </Form.Group>
                        <br /> <br />
                        <div className="text-center">
                            <Button variant="dark" type="submit">
                                SUBMIT
                            </Button>
                            <br></br><br />
                            <Button
                            className="text-uppercase"
                                variant="light"
                                type="button"
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Don't have an account? Click Here
                            </Button>
                            <br /> <br />
                        </div>
                    </Form>
                
            </Container>
        </div>
    );
}
