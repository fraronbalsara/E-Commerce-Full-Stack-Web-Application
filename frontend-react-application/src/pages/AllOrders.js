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
            let paymentStatus = orderDelivered.paymentStatus;
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
            <nav className="navbar navbar-expand-lg justify-content-center mb-4 border rounded-5">
                <div className="container row">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse col-5" id="navbarNav">
                        <ul className="navbar-nav ms-4">
                            <Link className="btn btn-lg" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "15px"}}>
                                Home
                            </Link>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse col" id="navbarNav">
                        <ul className="navbar-nav">
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
                            <h6>Order ID:              {order.order_id}</h6>
                            <h6>Customer Email:        {order.customerEmail}</h6>
                            <h6>Delivery Address:      {order.address}</h6>
                            <h6>Order Date:            {order.orderDate}</h6>
                            <h6>Order Status:          {order.orderStatus}</h6>
                            <h6>Payment Status:        {order.paymentStatus}</h6>
                            <h6>Payment Mode:          {order.paymentMode}</h6>
                            <h6>Transaction ID:        {order.transaction_id}</h6>
                            <h6>Products: </h6>
                            <table className='border'>
                                <tbody>
                                    <tr style={{display: "table-cell"}}>
                                        <td className='px-4 border' style={{display: "block"}}>
                                            Product Name
                                        </td>
                                    {
                                        order.productNames.map(name=>(
                                            <td className='px-4 border' style={{display: "block"}}>
                                                {name}
                                            </td>
                                        ))
                                    }
                                    </tr>
                                    <tr style={{display: "table-cell"}}>
                                        <td className='px-4 border text-center' style={{display: "block"}}>
                                            Product Quantity
                                        </td>
                                    {
                                        order.productQuantities.map(quantity=>(
                                            <td className='px-4 border text-center' style={{display: "block"}}>
                                                {quantity}
                                            </td>
                                        ))
                                    }
                                    </tr>
                                    <tr style={{display: "table-cell"}}>
                                        <td className='px-4 border text-center' style={{display: "block"}}>
                                            Product Price
                                        </td>
                                    {
                                        order.productPrices.map(price=>(
                                            <td className='px-4 border text-end' style={{display: "block"}}>
                                                &#8377;{price}
                                            </td>
                                        ))
                                    }
                                    </tr>
                                    <tr style={{display: "table-cell"}}>
                                        <td className='px-4 border text-center' style={{display: "block"}}>
                                            Product SubTotal
                                        </td>
                                    {
                                        order.productSubTotals.map(subTotal=>(
                                            <td className='px-4 border text-end' style={{display: "block"}}>
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
                            <div>
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