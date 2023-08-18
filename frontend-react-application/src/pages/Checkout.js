// Fraron Balsara

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ButtonSpinner from "../hooks/ButtonSpinner";

const Checkout = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "customer"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[cart, setCart] = useState([]);
    const[customer, setCustomer] = useState('');
    const[address, setAddress] = useState();
    const[paymentMode, setPaymentMode] = useState("");
    const[razorpayTransaction, setRazorpayTransaction] = useState('');
    const [buttonLoading, setButtonLoading] = ButtonSpinner("Place Order", "Placing Order...");

    let totalCost = 0
    let orderTotal = 0;
    let deliveryCharge = 0;
    let productIds = []
    let productNames = []
    let productImageFilePaths = []
    let productPrices = []
    let productQuantities = []
    let productSubTotals = []

    // Fetching cart items and customer details
    useEffect(()=>{
        fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCart(result);})
            .catch((err)=>{
                console.log(err);
            });
        fetch("http://localhost:8080/customer/list-customer-by-email/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCustomer(result); setAddress(result.address)})
            .catch((err)=>{
                console.log(err);
            });
    },[])

    // Function to iterate over cart items to calculate total cost and set product details to variables
    function myIterateFunction(cartItem){
        orderTotal = orderTotal + cartItem.subTotal;
        productIds.push(cartItem.product.product_id);
        productNames.push(cartItem.product.name);
        productImageFilePaths.push(cartItem.product.imageFilePath);
        productPrices.push(cartItem.product.price);
        productQuantities.push(cartItem.quantity);
        productSubTotals.push(cartItem.subTotal);
    }

    // Function call for iterating over cart items
    cart.forEach(myIterateFunction)

    // Setting delivery charge based on cart value
    if(orderTotal < 500){
        deliveryCharge = 100;
    }
    totalCost = orderTotal + deliveryCharge;

    // On-click function for 'Place Order' button
    function placeOrder(){
        // Checking if cart is empty and redirecting to home page if cart is empty
        if(orderTotal === 0){
            alert("Cart is empty. Cannot checkout with an empty cart.");
            window.location.replace("/");
        }
        // Checking if a valid delivery address is present
        else if(address === undefined || address.length < 20){
            alert("Enter a detailed and valid address please.");
        }
        // Checking if payment mode is selected
        else if(paymentMode === ""){
            alert("Please select a payment mode.");
        }
        // If cart is not empty, address is valid and payment mode is selected
        else{
            setButtonLoading(true);
            let customerEmail = sessionStorage.getItem("email");
            let orderStatus = "Placed";
            let paymentStatus = "";
            let transaction_id = "";
            // Executes for Cash On Delivery payment mode
            if(paymentMode === "CashOnDelivery"){              
                paymentStatus = "Pending";
                commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id);
            }
            // Executes for online payment mode
            else if(paymentMode === "Online"){
                // Setting up a razorpay order and retreiving razorpay order id
                fetch("http://localhost:8080/order/razorpay-transaction/" + totalCost)
                    .then(res=>res.json())
                    .then((result)=>{setRazorpayTransaction(result);})
                    .catch((err)=>{
                        console.log(err);
                })
                paymentStatus = "Completed";
                // Setting up razorpay details
                let options = {
                    "key": "rzp_test_ukDELYCqE2Fg1f",
                    "amount": totalCost * 100,
                    "currency": "INR",
                    "name": "E-Mart",
                    "description": "E-Mart Transaction",
                    "image": "/emart-logo-for-razorpay.jpg",
                    "order_id": razorpayTransaction.orderId,
                    "handler": function (response){
                        // On successful payment, places the order in the system
                        transaction_id = response.razorpay_payment_id;
                        commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id);
                    },
		    "modal": {
			"ondismiss": function(){
			    setButtonLoading(false);
		 	}
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
                // Initializing and opening razorpay window
                let rzp1 = new window.Razorpay(options);
                rzp1.open();
            }      
        }
    }

    // Function to place order in the system once detials are confirmed
    function commonOrderPlacementFunc(customerEmail, orderStatus, paymentStatus, transaction_id){
        let reqBody = {customerEmail, address, orderStatus, paymentStatus, paymentMode, transaction_id, 
            productIds, productNames, productImageFilePaths, productPrices, productQuantities, 
            productSubTotals, deliveryCharge, totalCost};
        // Deleting items from cart
        fetch("http://localhost:8080/cartItem/delete-cartItems/" + customerEmail, {method: 'DELETE'})
            .then((response)=>{
                if(response.status===200){
                    // Sending order details to the backend system
                    fetch("http://localhost:8080/order/add-order",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(reqBody)
                        })
                        .then((response)=>{
                            // On success redirecting to Order Confirmed page
                            if(response.status===200){
                                alert("Order placed successfully. Check 'My Orders' for order details.");
                                window.location.replace("/Customer/Checkout/OrderConfirmed");
                            }
                            else{
                                alert("Error Occured! Failed to place order. Please check logs.")
                                console.log(response);
                                setButtonLoading(false);
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }
                else{
                    alert("Error Occured! Failed to place order. Please check logs.")
                    console.log(response);
                    setButtonLoading(false);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div className='min-vh-100'>
            <Navbar header="Checkout"/>

            {/* Checkout Details Start */}
            <div className="d-flex flex-column align-items-center">
                <div id="background-div" className="col-lg-6 ms-md-4 text-left border border-primary rounded-4 border-3" style={{backgroundColor: "#A1E5FF"}}>
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
                            <button className="btn" onClick={placeOrder} ref={buttonLoading}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout Details End */}
        </div>
    );
}
export default Checkout;