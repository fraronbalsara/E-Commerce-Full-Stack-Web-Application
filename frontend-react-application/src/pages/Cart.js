import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const[cart, setCart] = useState([]);

    let total = 0
    cart.map(cartItem=>(
        total = total + cartItem.subTotal
    ))

    useEffect(()=>{
        fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
            .then(res=>res.json())
            .then((result)=>{setCart(result);})
    },[])

    console.log(cart);

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

    function update(cartItem_id, email, product, price){
        let quantity = prompt("Enter quantity (Min: 1; Max: 5):");
        if(quantity >= 1 && quantity <=5){
            let subTotal = price * quantity;
            const reqBody = {cartItem_id, email, quantity, subTotal, product};
            let url = "http://localhost:8080/cartItem/update-cartItem/" + cartItem_id;
            fetch(url,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(reqBody)
                }).then((response)=>{
                    if(response.status===200){
                        window.location.reload();
                    }
                    else{
                        console.log(response);
                        alert("Failed to update cart item.");
                    }
                }).catch((err)=>{
                    console.log(err);
                })
        }
        else if(quantity === null){
            ;
        }
        else{
            alert("Min Quantity: 1; Max Quantity: 5")
            console.log(quantity);
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
                                My Cart
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='d-flex flex-column align-items-center'>
                <table>
                    <thead>
                        <tr>
                            <th className='px-4 border text-center'>Item Number</th>
                            <th className='px-4 border text-center'>Product ID</th>
                            <th className='px-4 border text-center'>Product Name</th>
                            <th className='px-4 border text-center'>Quantity</th>
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
                                <td className='px-4 border text-end'>&#8377;{cartItem.subTotal}</td>
                                <td className='px-4 py-2 border text-center'>
                                    <button className='btn' onClick={()=>update(cartItem.cartItem_id, cartItem.email, cartItem.product, cartItem.product.price)}>Update</button>&nbsp;
                                    <button className='btn' onClick={()=>remove(cartItem.cartItem_id)}>Remove</button>
                                </td>
                            </tr>               
                        )) 
                    }
                        <tr>
                            <td className='px-4 py-2 border text-center' colSpan={1}>Total</td>
                            <td className='px-4 py-2 border text-center' colSpan={5}>&#8377;{total}</td>
                        </tr>
                    </tbody>
                </table>

                <button className='btn mt-3'>Proceed with checkout</button>
            </div>
        </div>
    );
}
export default Cart;