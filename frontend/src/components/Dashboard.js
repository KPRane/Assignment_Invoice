import React, { useState, useEffect } from "react";
import Nav1 from "./Nav1";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { getInvoice } from "../config/MyService";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();
    let [total, setTotal] = useState(0);
    let [paid, setPaid] = useState(0);
    let [unpaid, setUnpaid] = useState(0);
    let [partpaid, setPartpaid] = useState(0);
    useEffect(() => {
        getInvoice().then((res) => {
            res.data.forEach((element) => {
                if (element.status === "Unpaid") {
                    unpaid += 1;
                    setUnpaid(unpaid);
                } else if (element.status === "Paid") {
                    paid += 1;
                    setPaid(paid);
                } else if (element.status === "Partially Paid") {
                    partpaid += 1;
                    setPartpaid(partpaid);
                }
                total += 1;
                setTotal(total);
            });
        });
    }, []);

    return (
        <div>
            <Nav1 />
            <br />
            <Container  className=" col-7"style={{ backgroundColor: "#CEE5D0" }}>
                <br />
                <h4 className="text-center display-5">TOTAL INVOICES</h4><br/><br/>
                <Card className="col-6 container">
                    <Card.Body>
                        <Card.Title>TOTAL INVOICE</Card.Title>
                        <Card.Text>{total}</Card.Text>
                        <Button
                            variant="dark"
                            onClick={() => navigate("/invoicehistory")}
                        >
                            INVOICE LIST 
                        </Button>
                    </Card.Body>
                </Card>
                <br />
                <Row>
                    <h4 className="text-center display-5">INVOICES STATUS</h4><br/><br/>
                    {/* <Col>
                        <Card
                          
                        >
                            <Card.Body className="text-dark">
                                <Card.Title>Paid</Card.Title>
                                <Card.Text>{paid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                           
                        >
                            <Card.Body className="text-dark">
                                <Card.Title>Partially Paid</Card.Title>
                                <Card.Text>{partpaid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col>
                        <Card className="col-6 container"
                            
                        >
                            <Card.Body className="text-dark">
                                <Card.Title>UNPAID</Card.Title>
                                <Card.Text>{unpaid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
            </Container>
        </div>
    );
}
