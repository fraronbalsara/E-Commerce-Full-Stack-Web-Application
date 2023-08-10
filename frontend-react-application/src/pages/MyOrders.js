import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = (props) => {

    const[orders, setOrders] = useState([]);

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
                                My Orders
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
                                            <td className='px-4 border text-center' style={{display: "block"}}>
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
                                            <td className='px-4 border text-center' style={{display: "block"}}>
                                                &#8377;{subTotal}
                                            </td>
                                        ))
                                    }
                                    </tr>
                                    <tr>
                                        <td className='px-4 py-2 border border-2 text-center' colSpan={1}>Total</td>
                                        <td className='px-4 py-2 border border-2 text-center' colSpan={5}>&#8377;{order.totalCost}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default MyOrders;