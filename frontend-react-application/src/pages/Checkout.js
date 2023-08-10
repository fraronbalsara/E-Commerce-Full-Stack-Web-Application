import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = (props) => {

    const[cart, setCart] = useState([]);
    const[customer, setCustomer] = useState('');
    const [address, setAddress] = useState();
    const [paymentMode, setPaymentMode] = useState("");

    let totalCost = 0
    let productIds = []
    let productNames = []
    let productImageFilePaths = []
    let productPrices = []
    let productQuantities = []
    let productSubTotals = []
    cart.forEach(myIterateFunction)

    function myIterateFunction(cartItem){
        totalCost = totalCost + cartItem.subTotal;
        productIds.push(cartItem.product.product_id);
        productNames.push(cartItem.product.name);
        productImageFilePaths.push(cartItem.product.imageFilePath);
        productPrices.push(cartItem.product.price);
        productQuantities.push(cartItem.quantity);
        productSubTotals.push(cartItem.subTotal);
    }

    useEffect(()=>{
        fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCart(result);})
            .catch((err)=>{
                console.log(err);
            })
        fetch("http://localhost:8080/customer/list-customer-by-email/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCustomer(result);})
            .catch((err)=>{
                console.log(err);
            })
        setAddress(customer.address);
        
        {/* Added this conditon to redirect the user to the homepage if the user directly tries to access 
            checkout page without having any products in their cart 
        if(customer !== ''){
            if(totalCost<=0){
                window.location.replace("/");
            }
        }*/}  
    },[customer])

    function placeOrder(){
        if(address === undefined || address.length < 20){
            alert("Enter a detailed and valid address please.");
        }
        else{
            let customerEmail = sessionStorage.getItem("email");
            let orderStatus = "Placed";
            let paymentStatus = "";
            console.log(paymentMode);
            console.log(address);
            if(paymentMode === ""){
                alert("Please select a payment mode.");
                return;
            }
            else if(paymentMode === "CashOnDelivery"){              
                paymentStatus = "Pending";
            }
            else{
                paymentStatus = "Completed";
            }
            let reqBody = {customerEmail, address, orderStatus, paymentStatus, paymentMode, productIds, productNames, productImageFilePaths, productPrices, productQuantities, productSubTotals, totalCost};
            console.log(reqBody);
            fetch("http://localhost:8080/cartItem/delete-cartItems/" + customerEmail, {method: 'DELETE'})
                .then(()=>{
                    fetch("http://localhost:8080/order/add-order",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(reqBody)
                        })
                        .then((response)=>{
                            if(response.status===200){
                                alert("Order placed successfully. Check 'My Orders' for order details");
                                window.location.replace("/");
                            }
                            else{
                                alert("Error Occured! Failed to place order. Please check logs.")
                                console.log(response);
                            }
                        })
                        .catch((err)=>{
                            alert("Error Occured! Failed to place order. Please check logs.")
                            console.log(err);
                        })
                })
                .catch((err)=>{
                    alert("Error Occured! Failed to place order. Please check logs.")
                    console.log(err);
                })
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg justify-content-center mb-3 border rounded-5">
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
                                Checkout
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="d-flex flex-column align-items-center ms-3">
                <div id="background-div" className="col-lg-6 text-left border border-primary rounded-4 border-2">
                    <div className="text-center">
                        <img className="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo" />
                    </div>
                    <div>
                        <h2 className='text-center my-3'>Confirm Details</h2>
                        <div className="form-group row px-5 py-2">
                            <label htmlFor="originalAddress" className="col-sm-3 col-form-label">Address</label>
                            <div className="col-sm-9">
                                <textarea type="text" className="form-control" id="originalAddress" defaultValue={customer.address} onChange={(e)=>setAddress(e.target.value)} required></textarea>
                            </div>
                        </div>
                        <div className="form-group row px-5 py-2">
                            <label className="col-sm-3 col-form-label">Payment Mode</label>
                            <div className="from-check col-sm-9">
                                <input type='radio' className='form-check-input' id='cod' name='paymentMode' value={"CashOnDelivery"} onChange={(e)=>setPaymentMode(e.target.value)}></input>
                                <label className="form-check-label" htmlFor="cod">Cash On Delivery</label>&nbsp;&nbsp;
                                <input type='radio' className='form-check-input' id='online' name='paymentMode' value={"Online"} onChange={(e)=>setPaymentMode(e.target.value)}></input>
                                <label className="form-check-label" htmlFor="online">Online</label>
                            </div>
                        </div>
                        <div className="text-center px-5 pt-2 pb-4">
                            <button className="btn" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    );
}
export default Checkout;