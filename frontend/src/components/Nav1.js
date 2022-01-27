import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Nav1() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div>
            <Navbar bg="light"  style={{color:"black"}}>
                <Container>
                    <Navbar.Brand>INVOICE CREATER</Navbar.Brand>
                    <Nav className="mr-auto text-uppercase">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/addinvoice">Invoice</Nav.Link>
                        {/* <Nav.Link href="/settings">Settings</Nav.Link> */}
                        <Nav.Link href="/generatepdf">PDF </Nav.Link>
                        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
