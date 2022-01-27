import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import Nav1 from "./Nav1";
import { addInvoice } from "../config/MyService";
import { useNavigate } from "react-router";

export default function Invoice() {
    let total = [0];
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [product, setProduct] = useState({
        title: "",
        quantity: "",
        price: "",
        discount: "",
    });
    const [data, setData] = useState({
        innumber: "",
        recname: "",
        recaddress: "",
        recemail: "",
        recmobile: "",
        indate: "",
        duedate: "",
        items: "",
        total: "",
        status: "",
    });
    console.log(new Date().toLocaleDateString());
    let date = new Date().toLocaleDateString();

    useEffect(() => {
        let abc = JSON.parse(localStorage.getItem("products"));
        setItems(abc);
    }, []);

    const handleProducts = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };
    console.log(product);
    const handler = (event) => {
        const { name, value } = event.target;
        let invoicedate = document.getElementById("invoicedate").value;
        setData({
            ...data,
            indate: invoicedate,
            [name]: value,
            items: items,
            total: total.reduce((result, number) => result + number),
            status: "Unpaid",
        });
    };
    console.log(data);

    const invoiceAdd = (event) => {
        event.preventDefault();
        addInvoice(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("invoicenumber", res.data.invoicenumber);
                alert(res.data.message);
                navigate("/generatepdf");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
        localStorage.removeItem("products");
    };

    const productSubmit = (event) => {
        // event.preventDefault();
        if (localStorage.getItem("products") !== null) {
            let arr = JSON.parse(localStorage.getItem("products"));
            arr.push(product);
            localStorage.setItem("products", JSON.stringify(arr));
        } else {
            let arr = [];
            arr.push(product);
            localStorage.setItem("products", JSON.stringify(arr));
        }
    };

    return (
        <div>
            <Nav1 />
            <Container  style={{

                backgroundColor: "#CEE5D0",
            }}>
                <Col  className="col-8 container">

                    <h2 className="text-center display-5 text-uppercase">
                        Add Products
                    </h2>
                    <Form
                        className="text-uppercase"
                        onSubmit={(e) => productSubmit(e)}
                    >
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter product name"
                                onChange={handleProducts}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                placeholder="Enter product quantity"
                                onChange={handleProducts}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Enter price of product"
                                onChange={handleProducts}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Discount (%)</Form.Label>
                            <Form.Control
                                type="number"
                                name="discount"
                                placeholder="Enter product discount in %"
                                onChange={handleProducts}
                            />
                        </Form.Group>
                        <br />
                        <div className="text-center">
                            <Button variant="dark" type="submit" className="text-uppercase">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <br />

                </Col>
            </Container>
            <br/><br/>
            <Container style={{

                backgroundColor: "#CEE5D0",
            }}>
                <br />

                <Col className="col-8 container">

                    <h2 className="text-center display-5 text-uppercase">
                        Invoice Details
                    </h2>
                    <Form

                        onSubmit={(e) => invoiceAdd(e)}
                    >
                        <Form.Group>
                            <Form.Label>Invoice Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="innumber"
                                placeholder="Enter Invoice number"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Receiver Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="recname"
                                placeholder="Enter Receiver Name"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Receiver Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="recaddress"
                                placeholder="Enter Receiver Address"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Receiver Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="recemail"
                                placeholder="Enter Receiver Email"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Receiver Mobile Number
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="recmobile"
                                placeholder="Enter Receiver Mobile number"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Invoice Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="indate"
                                readOnly
                                value={new Date().toLocaleDateString()}
                                id="invoicedate"
                                placeholder="Enter Invoice date"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="duedate"
                                placeholder="Enter due date"
                                onChange={handler}
                            />
                        </Form.Group>
                        <br /> <br />
                        <h6 className="text-center display-5">PRODUCT</h6>
                        <Table striped bordered hover className="table-bordered bg-light " style={{border:"2px"}}>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Discount (%)</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items != undefined
                                    ? items.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.title}</td>
                                                <td>
                                                    {value.quantity}
                                                </td>
                                                <td>{value.price}</td>
                                                <td>
                                                    {value.discount}
                                                </td>
                                                <td>
                                                    {console.log(
                                                        total.push(
                                                            (value.price -
                                                                (value.price *
                                                                    value.discount) /
                                                                100) *
                                                            value.quantity
                                                        )
                                                    )}
                                                    {(value.price -
                                                        (value.price *
                                                            value.discount) /
                                                        100) *
                                                        value.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : ""}
                            </tbody>
                        </Table>
                        <h4>
                            TOTAL VALUE:
                            {total.reduce(
                                (result, number) => result + number
                            )}
                        </h4>

                        <div className="text-center">
                            <Button variant="dark" type="submit" className="text-uppercase">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <br />

                </Col>


            </Container>
        </div>
    );
}
