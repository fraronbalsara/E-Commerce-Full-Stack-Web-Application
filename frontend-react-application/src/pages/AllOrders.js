import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const AllOrders = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "admin"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[orders, setOrders] = useState([]);
    const[orderDispatch, setOrderDispatch] = useState();
    const[orderDelivered, setOrderDelivered] = useState();

    // useEffect hook called when orderDispatch changes, to send updated order details to the backend server
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
                })
                .then((response)=>{
                    if(response.status===200){
                        alert("Order updated successfully.");
                    }
                    else{
                        console.log(response);
                        alert("Failed to update order.");
                    }
                    setOrderDispatch();
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },[orderDispatch])

    // useEffect hook called when orderDelivered changes, to send updated order details to the backend server
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
                })
                .then((response)=>{
                    if(response.status===200){
                        alert("Order updated successfully.");
                    }
                    else{
                        console.log(response);
                        alert("Failed to update order.");
                    }
                    setOrderDelivered();
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    },[orderDelivered])

    // Fetch all order details
    useEffect(()=>{
        fetch("http://localhost:8080/order/list-orders")
            .then(res=>res.json())
            .then((result)=>{setOrders(result);})
            .catch((err)=>{
                console.log(err);
            })
    },[orders])

    // On-click function for 'Mark Dispatched' button
    function dispatched(order_id){
        if(window.confirm('Update Order Status to "Dispatched" for Order ID: ' + order_id + ' ?')){
            // Fetching one and setting details to orderDispatch for useEffect to trigger
            fetch("http://localhost:8080/order/list-order/" + order_id)
                .then(res=>res.json())
                .then((result)=>{setOrderDispatch(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
    }

    // On-click function for 'Mark Delivered' button
    function delivered(order_id){
        if(window.confirm('Update Order Status to "Delivered" for Order ID: ' + order_id + ' ?')){
            // Fetching one and setting details to orderDelivered for useEffect to trigger
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
            <Navbar header="All Orders"/>

            {/* Order Display Start */}
            {
                orders.toReversed().map(order=>(
                    <div className='container py-4 mb-4 mx-1 border border-3 rounded-5' style={{backgroundColor: "#A1E5FF", color: "black"}}>
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
                                    {/* Product Details Start */}
                                    <table className='border'>
                                        <tbody>
					                        <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center fw-bold' style={{display: "block", width: "276px"}}>
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
                                                <td className='px-4 border text-center fw-bold' style={{display: "block", width: "180px"}}>
                                                    Product Quantity
                                                </td>
                                            {
                                                order.productQuantities.map(quantity=>(
                                                    <td className='px-4 border text-center' style={{display: "block", width: "180px"}}>
                                                        {quantity}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center fw-bold' style={{display: "block", width: "152px"}}>
                                                    Product Price
                                                </td>
                                            {
                                                order.productPrices.map(price=>(
                                                    <td className='px-4 border text-end' style={{display: "block", width: "152px"}}>
                                                        &#8377;{price}
                                                    </td>
                                                ))
                                            }
                                            </tr>
                                            <tr style={{display: "table-cell"}}>
                                                <td className='px-4 border text-center fw-bold' style={{display: "block", width: "180px"}}>
                                                    Product SubTotal
                                                </td>
                                            {
                                                order.productSubTotals.map(subTotal=>(
                                                    <td className='px-4 border text-end' style={{display: "block", width: "180px"}}>
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
                                                <td className='px-4 py-2 border border-2 text-center fw-bold' colSpan={3}>Total</td>
                                                <td className='px-4 py-2 border border-2 text-end fw-bold' colSpan={1}>&#8377;{order.totalCost}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* Product Details End */}  
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
            {/* Order Display End */}
        </div>
    );
}
export default AllOrders;