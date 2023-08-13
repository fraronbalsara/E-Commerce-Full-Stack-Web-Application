import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllOrders = (props) => {

    const[orders, setOrders] = useState([]);
    const[orderDispatch, setOrderDispatch] = useState();
    const[orderDelivered, setOrderDelivered] = useState();

    useEffect(()=>{
        if(orderDispatch !== undefined){
            let order_id = orderDispatch.order_id;
            let customerEmail = orderDispatch.customerEmail;
            let address = orderDispatch.address;
            let orderDate = orderDispatch.orderDate;
            let orderStatus = "Dispatched";
            let paymentStatus = orderDispatch.paymentStatus;
            let paymentMode = orderDispatch.paymentMode;
            let transaction_id = orderDispatch.transaction_id;
            let productNames = orderDispatch.productNames;
            let imageFilePaths = orderDispatch.imageFilePaths; 
            let productPrices = orderDispatch.productPrices;
            let productQuantities = orderDispatch.productQuantities;
            let productSubTotals = orderDispatch.productSubTotals;
            let totalCost = orderDispatch.totalCost;
            const reqBody = {order_id, customerEmail, address, orderDate, orderStatus, paymentStatus, 
                paymentMode, transaction_id, productNames, imageFilePaths, productPrices, productQuantities, 
                productSubTotals, totalCost};
            fetch("http://localhost:8080/order/update-order/" +order_id,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(reqBody)
                }).then((response)=>{
                    if(response.status===200){
                        alert("Order updated successfully.");
                    }
                    else{
                        console.log(response);
                        alert("Failed to update order.");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            setOrderDispatch();
        }
    },[orderDispatch])

    useEffect(()=>{
        if(orderDelivered !== undefined){
            let order_id = orderDelivered.order_id;
            let customerEmail = orderDelivered.customerEmail;
            let address = orderDelivered.address;
            let orderDate = orderDelivered.orderDate;
            let orderStatus = "Delivered";
            let paymentStatus = "Completed";
            let paymentMode = orderDelivered.paymentMode;
            let transaction_id = orderDelivered.transaction_id;
            let productNames = orderDelivered.productNames;
            let imageFilePaths = orderDelivered.imageFilePaths; 
            let productPrices = orderDelivered.productPrices;
            let productQuantities = orderDelivered.productQuantities;
            let productSubTotals = orderDelivered.productSubTotals;
            let totalCost = orderDelivered.totalCost;
            const reqBody = {order_id, customerEmail, address, orderDate, orderStatus, paymentStatus, 
                paymentMode, transaction_id, productNames, imageFilePaths, productPrices, productQuantities, 
                productSubTotals, totalCost};
            fetch("http://localhost:8080/order/update-order/" +order_id,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(reqBody)
                }).then((response)=>{
                    if(response.status===200){
                        alert("Order updated successfully.");
                    }
                    else{
                        console.log(response);
                        alert("Failed to update order.");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            setOrderDelivered();
        }
    },[orderDelivered])

    useEffect(()=>{
        fetch("http://localhost:8080/order/list-orders")
            .then(res=>res.json())
            .then((result)=>{setOrders(result);})
            .catch((err)=>{
                console.log(err);
            })
    },[orders])

    function dispatched(order_id){
        if(window.confirm('Update Order Status to "Dispatched" for Order ID: ' + order_id + ' ?')){
            fetch("http://localhost:8080/order/list-order/" + order_id)
                .then(res=>res.json())
                .then((result)=>{setOrderDispatch(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
    }

    function delivered(order_id){
        if(window.confirm('Update Order Status to "Delivered" for Order ID: ' + order_id + ' ?')){
            fetch("http://localhost:8080/order/list-order/" + order_id)
                .then(res=>res.json())
                .then((result)=>{setOrderDelivered(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md justify-content-center mb-4 border rounded-5">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav my-2 ms-md-2">
                            <Link className="btn btn-lg" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "15px", width: "100px"}}>
                                Home
                            </Link>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-md-5 pe-md-4">
                            <h1 style={{color: "white"}}>
                                All Orders
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                orders.toReversed().map(order=>(
                    <div className='container py-4 mb-2 mx-1 border border-2 rounded-5' style={{backgroundColor: "#F6EEE3", color: "black"}}>
                        <div className='mt-1 ms-3'>
			                <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Order ID:</label>
                                <div className="col-sm-9">
                                    <label>{order.order_id}</label>     
                                </div>
                            </div>
			                <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Customer Email:</label>
                                <div className="col-sm-9">
                                    <label>{order.customerEmail}</label>     
                                </div>
                            </div>
			                <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Delivery Address:</label>
                                <div className="col-sm-9">
                                    <label>{order.address}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Order Date:</label>
                                <div className="col-sm-9">
                                    <label>{new Date(order.orderDate).toLocaleString("en-IN")}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Order Status:</label>
                                <div className="col-sm-9">
                                    <label>{order.orderStatus}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Payment Status:</label>
                                <div className="col-sm-9">
                                    <label>{order.paymentStatus}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Payment Mode:</label>
                                <div className="col-sm-9">
                                    <label>{order.paymentMode}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Transaction ID:</label>
                                <div className="col-sm-9">
                                    <label>{order.transaction_id}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3 col-lg-2">Products:</label>
                                <div className="col-sm-9 py-md-2" style={{overflowX: "auto"}}>
                                    <table className='border'>
                                        <tbody>
					                        <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center' style={{display: "block", width: "276px"}}>
                                                    Product Name
                                                </td>
                                            {
                                                order.productNames.map(name=>(
                                                    <td className='px-4 border text-center' style={{display: "block", width: "276px"}}>
                                                        {name}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center' style={{display: "block", width: "171px"}}>
                                                    Product Quantity
                                                </td>
                                            {
                                                order.productQuantities.map(quantity=>(
                                                    <td className='px-4 border text-center' style={{display: "block", width: "171px"}}>
                                                        {quantity}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center' style={{display: "block", width: "171px"}}>
                                                    Product Price
                                                </td>
                                            {
                                                order.productPrices.map(price=>(
                                                    <td className='px-4 border text-end' style={{display: "block", width: "171px"}}>
                                                        &#8377;{price}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center' style={{display: "block", width: "171px"}}>
                                                    Product SubTotal
                                                </td>
                                            {
                                                order.productSubTotals.map(subTotal=>(
                                                    <td className='px-4 border text-end' style={{display: "block", width: "171px"}}>
                                                        &#8377;{subTotal}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr>
                                                <td className='px-4 py-2 border border-2 text-center' colSpan={3}>Delivery Charge (Free Delivery for orders above &#8377;499 )</td>
                                                <td className='px-4 py-2 border border-2 text-end' colSpan={1}>&#8377;{order.deliveryCharge}</td>
                                            </tr>
                                            <tr>
                                                <td className='px-4 py-2 border border-2 text-center' colSpan={3}>Total</td>
                                                <td className='px-4 py-2 border border-2 text-end' colSpan={1}>&#8377;{order.totalCost}</td>
                                            </tr>
                                        </tbody>
                                    </table>   
                                </div>
                            </div>                           
                            <div className='text-center'>
                                <button className='btn btn mt-3 mx-3' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>dispatched(order.order_id)}>Mark Dispatched</button>
                                <button className='btn btn mt-3 mx-3' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>delivered(order.order_id)}>Mark Delivered</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default AllOrders;