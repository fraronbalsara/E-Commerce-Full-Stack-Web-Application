// Fraron Balsara

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const OrderConfirmed = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "customer"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[orders, setOrders] = useState([]);

    // useEffect to fetch and set last order details
    useEffect(()=>{
        fetch("http://localhost:8080/order/list-orders-by-email/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{
                setOrders(result);
                if(result[0] === undefined){
                    window.location.replace("/");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])
    
    return(
        <div className='min-vh-100'>
            <Navbar header="Order Confirmed"/>

            <div className="border border-3 rounded-5 pb-2 pt-3" style={{backgroundColor: "#A1E5FF"}}> 
                <div className='text-center mb-2 ms-md-3'>
                    {/* Order Confirmed Image */}
                    <img className='img-fluid' src="/order-confirmed.jpg" alt='order confirmed' style={{width: "275px", height: "125px"}}></img>
                </div>
                {/* Order Details Start */}
                {
                    orders.toReversed().slice(0,1).map(order=>(
                        <div className='container mb-2 mx-1'>
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
                            </div>
                        </div>
                    ))
                }
                {/* Order Details End */}
            </div>
        </div>
    );
}
export default OrderConfirmed;