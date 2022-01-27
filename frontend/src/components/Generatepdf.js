import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import Nav1 from "./Nav1";
import { getInvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";

const ref = React.createRef();

export default function Generatepdf() {
    const [state, setState] = useState([]);
    const [items, setItems] = useState([]);
    // const [user, setUser] = useState([]);
    let id = JSON.parse(localStorage.getItem("invoicenumber"));
    useEffect(() => {
        getInvoice().then((res) => {
            console.log(id);
            const match = res.data.filter((data) => {
                console.log(id);
                console.log(data.innumber);
                if (data.innumber === id) {
                    console.log(data);
                    let product = [];
                    data.items.forEach((ele) => {
                        product.push(ele);
                    });
                    setItems(product);
                    return data;
                }
            });
            setState(match);
        });
    }, []);
    console.log(state);
    console.log(items);
    
    console.log(ref);

    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };

    const sendmail = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            console.log("calling");
            sendMail(formData).then((res) => {
                console.log(res);
                console.log("in response");
            });
            console.log("call finished");
        });
    };

    return (
        <div>
            <Nav1 />
           
            <br />
            <Container
               className="container col-8 text-uppercase"
                ref={ref}
                id="divToPrint"
                style={{ backgroundColor: "#CEE5D0" }}
            >
                <div >
                    <Row>
                        <Col md={9}>
                            <div>
                                <Image
                                    src="https://dashboard.invoice.ng/dboard/img/logo.png"
                                    width="200px"
                                    height="100px"
                                />
                            </div>
                        </Col>
                        <Col md={3}>
                            <h2>Invoice</h2>
                            <p>Number: {id}</p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={9}>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    FROM
                                </span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                  NEOSOFT TECH
                                </span>
                                <br />
                                Neosofttech@gmail.com
                                <br />
                                7723456666
                            </p>
                            <br />
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    BILL TO
                                </span>
                                <br />
                                {state.map((value, index) => {
                                    return (
                                        <>
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.recname}
                                            </span>
                                            <br />
                                            {value.recemail}
                                            <br />
                                            {value.recmobile}
                                            <br />
                                            {value.recaddress}
                                        </>
                                    );
                                })}
                            </p>
                        </Col>
                        <Col md={3}>
                            {state.map((value, index) => {
                                return (
                                    <div>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                STATUS:
                                            </span>
                                            <br />
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                {value.status}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                DATE
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.indate}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                DUE DATE
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.duedate}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                AMOUNT
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                &#8377; {value.total}
                                            </span>
                                            <br />
                                        </p>
                                    </div>
                                );
                            })}
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table  className="table table-bordered " style={{border:"2px"}}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.title}</td>
                                        <td>{value.quantity}</td>
                                        <td>&#8377; {value.price}</td>
                                        <td>{value.discount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms:</span>
                    <br />
                    Please pay the amount within 30 days.
                </div>
                <br />
            </Container>
            <br />
            <Container>
                <div className="text-center">
                    
                    <Button variant="dark" onClick={() => generatePdf()}>
                        DOWMLOAD PDF
                    </Button>
                    &nbsp;
                    <Button variant="dark" onClick={() => sendmail()}>
                        SEND EMAIL
                    </Button>
                </div>
            </Container>
        </div>
    );
}
