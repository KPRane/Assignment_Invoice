import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../config/MyService";

const regForName = /^[a-zA-Z]{2,100}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForUsername = RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+){6,100}$/);
const regForPassword = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/
);

export default function Registration() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        errors: {
            fname: "",
            lname: "",
            uname: "",
            email: "",
            password: "",
            cpassword: "",
        },
    });
    const [data, setData] = useState({
        fname: "",
        lname: "",
        uname: "",
        email: "",
        password: "",
    });
    const onChangeUser = (event) => {
        const { name, value } = event.target;
        let errors = state.errors;
        switch (name) {
            case "fname":
                errors.fname = regForName.test(value)
                    ? ""
                    : "PLS ENTER ONLY CHARACTER";
                break;

            case "lname":
                errors.lname = regForName.test(value)
                    ? ""
                    : "PLS ENTER ONLY CHARACTER";
                break;

            case "uname":
                errors.uname = regForUsername.test(value)
                    ? ""
                    : "USERNAME SHOULD BE BETWEEN 7-20 CHARACTER ";
                break;

            case "email":
                errors.email = regForEmail.test(value)
                    ? ""
                    : "PLS ENTER VALID EMAIL";
                break;

            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "PLS ENTER VALID PASSWORD";
                break;

            case "cpassword":
                errors.cpassword =
                    document.getElementById("password").value === value
                        ? ""
                        : "PASSWORD AND CONFIRM PASSWORD MUST BE SAME";
                break;
            default:
                alert("Fill proper details");
        }
        setState({ errors, [name]: value });
        setData({ ...data, [name]: value });
    };

    const register = (event) => {
        event.preventDefault();
        if (validate(state.errors)) {
            let userdata = {
                fname: data.fname,
                lname: data.lname,
                uname: data.uname,
                email: data.email,
                password: data.password,
            };
            console.log(userdata);
            postUsers(userdata).then((res) => {
                if (res.data.flag === 1) {
                    alert(res.data.message);
                    navigate("/");
                } else if (res.data.flag === 0) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            });
        }
    };

    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };

    return (
        <div>
            <Container className="col-8 text-uppercase" style={{ backgroundColor: "#CEE5D0" }}>
                <br />
               
                    <h2 className="text-center text-uppercase display-5">Registration </h2>
                    <Form className="col-8 container"
                      
                        onSubmit={(e) => register(e)}
                    >
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                name="fname"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.fname.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.fname}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                name="lname"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.lname.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.lname}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name="uname"
                                type="text"
                                placeholder="Enter username"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.uname.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.uname}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="text"
                                placeholder="Enter email address"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.email.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.email}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.password.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.password}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                name="cpassword"
                                type="password"
                                placeholder="Re-enter Password"
                                onChange={onChangeUser}
                            />
                            <Form.Text>
                                {state.errors.cpassword.length > 0 && (
                                    <span style={{ color: "red" }}>
                                        {state.errors.cpassword}
                                    </span>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <br></br>

                        <div className="text-center">
                            <Button variant="dark" type="submit">
                                SUBMIT
                            </Button>

                            <br></br><br/>
                            <Button
                                variant="light"
                                type="button"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Already have an account? Click Here
                            </Button> <br></br>
                        </div>
                    </Form>
                    <br/><br/><br/>
               
            </Container>
            <br></br>
        </div>
    );
}
