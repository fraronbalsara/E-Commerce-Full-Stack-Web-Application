// Fraron Balsara

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const MyOrders = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "customer"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[orders, setOrders] = useState([]);

    // useEffect to fetch all order details pertaining to the customer
    useEffect(()=>{
        fetch("http://localhost:8080/order/list-orders-by-email/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setOrders(result);})
            .catch((err)=>{
                console.log(err);
            })
    },[])
    console.log(orders)

    return (
        <div className='min-vh-100'>
            <Navbar header="My Orders"/>

            {/* My Orders Display Start */}
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
                                                <td className='px-4 border text-center fw-bold' style={{display: "block", width: "151px"}}>
                                                    Product Price
                                                </td>
                                            {
                                                order.productPrices.map(price=>(
                                                    <td className='px-4 border text-end' style={{display: "block", width: "151px"}}>
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
            {/* My Orders Display End */}
        </div>
    );
}
export default MyOrders;