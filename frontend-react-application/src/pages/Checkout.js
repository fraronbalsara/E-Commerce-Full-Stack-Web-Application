import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = (props) => {

    const[cart, setCart] = useState([]);
    const[customer, setCustomer] = useState('');
    const[address, setAddress] = useState();
    const[paymentMode, setPaymentMode] = useState("");
    const[razorpayTransaction, setRazorpayTransaction] = useState('');

    let totalCost = 0
    let orderTotal = 0;
    let deliveryCharge = 0;
    let productIds = []
    let productNames = []
    let productImageFilePaths = []
    let productPrices = []
    let productQuantities = []
    let productSubTotals = []
    cart.forEach(myIterateFunction)
    if(orderTotal < 500){
        deliveryCharge = 100;
    }
    totalCost = orderTotal + deliveryCharge;

    function myIterateFunction(cartItem){
        orderTotal = orderTotal + cartItem.subTotal;
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
            });
        fetch("http://localhost:8080/customer/list-customer-by-email/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCustomer(result);})
            .catch((err)=>{
                console.log(err);
            });
        setAddress(customer.address);
        
        {/* Added this conditon to redirect the user to the homepage if the user directly tries to access 
        checkout page without having any products in their cart 
        if(customer !== '' || sessionStorage.getItem('email') === null){
            if(orderTotal<=0){
                console.log("YES");
            }
        }
        */}   
    },[customer])

    function placeOrder(){
        if(address === undefined || address.length < 20){
            alert("Enter a detailed and valid address please.");
        }
        else{
            let customerEmail = sessionStorage.getItem("email");
            let orderStatus = "Placed";
            let paymentStatus = "";
            let transaction_id = "";
            if(paymentMode === ""){
                alert("Please select a payment mode.");
                return;
            }
            else if(paymentMode === "CashOnDelivery"){              
                paymentStatus = "Pending";
                commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id);
            }
            else if(paymentMode === "Online"){
                fetch("http://localhost:8080/order/razorpay-transaction/" + totalCost)
                    .then(res=>res.json())
                    .then((result)=>{setRazorpayTransaction(result);})
                    .catch((err)=>{
                        console.log(err);
                })
                paymentStatus = "Completed";
                let options = {
                    "key": "rzp_test_ukDELYCqE2Fg1f",
                    "amount": totalCost * 100,
                    "currency": "INR",
                    "name": "E-Mart",
                    "description": "E-Mart Transaction",
                    "image": "/emart-logo-for-razorpay.jpg",
                    "order_id": razorpayTransaction.orderId,
                    "handler": function (response){
                        transaction_id = response.razorpay_payment_id;
                        commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id);
                    },
                    "prefill": { //Prefilling Customer Details
                        "name": customer.name,
                        "email": customer.email,
                        "contact": customer.mobile
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                let rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
            
        }
    }

    function commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id){
        let reqBody = {customerEmail, address, orderStatus, paymentStatus, paymentMode, transaction_id, productIds, productNames, productImageFilePaths, productPrices, productQuantities, productSubTotals, deliveryCharge, totalCost};
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
                                alert("Order placed successfully. Check 'My Orders' for order details.");
                                window.location.replace("/Customer/Checkout/OrderConfirmed");
                            }
                            else{
                                alert("Error Occured! Failed to place order. Please check logs.")
                                console.log(response);
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                })
                .catch((err)=>{
                    alert("Error Occured! Failed to place order. Please check logs.")
                    console.log(err);
                })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md justify-content-center mb-3 border rounded-5">
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
                        <ul className="navbar-nav me-md-5 pe-md-5">
                            <h1 style={{color: "white"}}>
                                Checkout
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="d-flex flex-column align-items-center">
                <div id="background-div" className="col-lg-6 ms-md-3 text-left border border-primary rounded-4 border-2">
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
                            <div className="from-check col-sm-6 col-lg-5 pt-md-2">
                                <input type='radio' className='form-check-input' id='cod' name='paymentMode' value={"CashOnDelivery"} onChange={(e)=>setPaymentMode(e.target.value)}></input>
                                <label className="form-check-label ms-2" htmlFor="cod">Cash On Delivery</label>
                            </div>
			                <div className="from-check col-sm-3 col-lg-3 pt-md-2">
                                <input type='radio' className='form-check-input' id='online' name='paymentMode' value={"Online"} onChange={(e)=>setPaymentMode(e.target.value)}></input>
                                <label className="form-check-label ms-2" htmlFor="online">Online</label>
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