import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "customer"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[cart, setCart] = useState([]);
    let total = 0;
    let orderTotal = 0;
    let deliveryCharge = 0;

    // useEffect to fetch and set cart items
    useEffect(()=>{
        fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCart(result);})
    },[])

    // Traversing each cart item and adding the item cost
    cart.forEach(cartItem => {
        orderTotal = orderTotal + cartItem.subTotal;
    });
    // Setting delivery cost based on order total
    if(orderTotal < 500){
        deliveryCharge = 100;
    }
    // Final total = Order Total + Delivery Cost
    total = orderTotal + deliveryCharge;

    // On-click function for 'Remove' button; to remove product from cart
    function remove(id){
        if(window.confirm("Are you sure you want to remove this from your cart?")){
            let url = "http://localhost:8080/cartItem/delete-cartItem/" + id;
            fetch(url, {method: 'DELETE'})
                .then(()=>{
                    window.location.reload();
                })
                .catch((err)=>{
                    alert("Error! Failed to remove.")
                    console.log(err);
                })
        }
    }

    // On-click function for 'Modify' button; to modify product quantity in cart
    function update(cartItem_id, email, product, price){
        // Prompt to get quantity from user
        let quantity = prompt("Enter quantity (Min: 1; Max: 5):");
        // Checking to see if quantity is between 1 and 5
        if(quantity >= 1 && quantity <=5){
            let subTotal = price * quantity;
            const reqBody = {cartItem_id, email, quantity, subTotal, product};
            let url = "http://localhost:8080/cartItem/update-cartItem/" + cartItem_id;
            fetch(url,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(reqBody)
                })
                .then((response)=>{
                    if(response.status===200){
                        window.location.reload();
                    }
                    else{
                        console.log(response);
                        alert("Failed to update cart item.");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
        }
        else if(quantity === null){
            ;
        }
        // Alert is displayed if quantity is not between 1 and 5
        else{
            alert("Min Quantity: 1; Max Quantity: 5")
            console.log(quantity);
        }
    }

    // On-click function for 'Proceed with checkout' button
    function checkout(){
        // Checking if cart is not empty
        if(orderTotal>0){
            window.location.assign("/Customer/Checkout");
        }
        // Alert is displayed if cart is empty
        else{
            alert("Cart is empty.")
        }
    }

    return (
        <div>
            {/* Navbar Start */}
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
                                My Cart
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}

            {/* Cart Items Display Start */}
            <div className='d-flex flex-column align-items-center'>
                <div className='container' style={{overflowX: "auto"}}>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th className='px-4 border text-center'>Item Number</th>
                                <th className='px-4 border text-center'>Product ID</th>
                                <th className='px-4 border text-center'>Product Name</th>
                                <th className='px-4 border text-center'>Quantity</th>
                                <th className='px-4 border text-center'>Unit Price</th>
                                <th className='px-4 border text-center'>Sub-total</th>
                                <th className='px-4 border text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            cart.map((cartItem, index)=>(  
                                <tr>
                                    <td className='px-4 border text-end'>{index + 1}</td>
                                    <td className='px-4 border text-end'>{cartItem.product.product_id}</td>
                                    <td className='px-4 border'>{cartItem.product.name}</td>
                                    <td className='px-4 border text-end'>{cartItem.quantity}</td>
                                    <td className='px-4 border text-end'>&#8377;{cartItem.product.price}</td>
                                    <td className='px-4 border text-end'>&#8377;{cartItem.subTotal}</td>
                                    <td className='px-4 py-2 border text-center'>
                                        <button className='btn mx-2 my-1' onClick={()=>update(cartItem.cartItem_id, cartItem.email, cartItem.product, cartItem.product.price)}>Update</button>
                                        <button className='btn mx-2 my-1' onClick={()=>remove(cartItem.cartItem_id)}>Remove</button>
                                    </td>
                                </tr>               
                            )) 
                        }
                            <tr>
                                <td className='px-4 py-2 border text-center' colSpan={5}>Delivery Charge (Free Delivery for orders above &#8377;499 )</td>
                                <td className='px-4 py-2 border text-end' colSpan={1}>&#8377;{deliveryCharge}</td>
                                <td className='px-4 py-2 border text-center' colSpan={1}></td>
                            </tr>
                            <tr>  
                                <td className='px-4 py-2 border text-center fw-bold' colSpan={5}>Total</td>
                                <td className='px-4 py-2 border text-end fw-bold' colSpan={1}>&#8377;{total}</td>
                                <td className='px-4 py-2 border text-center' colSpan={1}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='btn mt-3' onClick={checkout}>Proceed with checkout</button>
                </div>
            </div>
            {/* Cart Items Display End */}
        </div>
    );
}
export default Cart;