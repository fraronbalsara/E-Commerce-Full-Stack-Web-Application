// Fraron Balsara

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

    // Variable declarations and initializations
    const[products, setProducts] = useState([]);
    const[value, setValue] = useState();
    const cats = ["Electronics", "Clothing", "Health", "Stationary", "Other"];
    const [cart, setCart] = useState([]);


    // Function to fetch products from selected category only and set to products variable
    function categoryfunc(category){
        setValue(category)
        let url = "http://localhost:8080/product/list-products-by-category/" + category;
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
            .catch((err)=>{
                console.log(err);
            })
    }

    // Function to fetch products from selected sub-category only and set to products variable
    function subCategoryfunc(subCategory){
        setValue(subCategory)
        let url = "http://localhost:8080/product/list-products-by-subcategory/" + subCategory;
            fetch(url)
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
                .catch((err)=>{
                    console.log(err);
                })
    }

    // Function to fetch all products and set to products variable
    function displayAll(all){
        setValue(all)
        fetch("http://localhost:8080/product/list-products")
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
                .catch((err)=>{
                    console.log(err);
                })
    }

    // On-click function for user logout
    function logout(){
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("type");
        window.location.replace("/");
    }

    // On-click function for 'Add' button; to add product to cart
    function add(product){
        // Prompt to get quantity from user
        let quantity = prompt("Enter quantity (Min: 1; Max: 5):");
        // Checking to see if quantity is between 1 and 5
        if(quantity >= 1 && quantity <=5){
            let subTotal = product.price * quantity;
            let email = sessionStorage.getItem("email");
            const reqBody = {email, quantity, subTotal, product};
            console.log(reqBody)
            let url = "http://localhost:8080/cartItem/add-cartItem";
            fetch(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(reqBody)
                })
                .then((response)=>{
                    if(response.status===200){
			            fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
                            .then(res=>res.json())
                            .then((result)=>{setCart(result);})
                            .catch((err)=>{
                                    console.log(err);
                            })
                        alert("Product added to cart.");
                    }
                    else{
                        console.log(response);
                        alert("Failed to update cart item.");
                    }
                })
                .catch((err)=>{
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

    // On-click function for 'Remove' button; to remove product from cart
    function remove(product){
        if(window.confirm("Are you sure you want to remove this from your cart?")){
            cart.forEach(function(cartItem){
                if(cartItem.product.product_id === product.product_id){
                    let url = "http://localhost:8080/cartItem/delete-cartItem/" + cartItem.cartItem_id;
                    fetch(url, {method: 'DELETE'})
                        .then((response)=>{
                            if(response.status===200){
                                fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
                                    .then(res=>res.json())
                                    .then((result)=>{setCart(result);})
                                    .catch((err)=>{
                                            console.log(err);
                                    })
                                    alert("Product was removed from cart.");
                            }
                            else{
                                console.log(response);
                            }
                            })
                        .catch((err)=>{
                            alert("Error! Failed to remove.");
                            console.log(err);
                        });
                }
            });
        }
    }

    // On-click function for 'Modify' button; to modify product quantity in cart
    function modify(product){
        // Prompt to get quantity from user
        let quantity = prompt("Enter quantity (Min: 1; Max: 5):");
        // Checking to see if quantity is between 1 and 5
        if(quantity >= 1 && quantity <=5){
            cart.forEach(function(cartItem){
                if(cartItem.product.product_id === product.product_id){
                    let subTotal = product.price * quantity;
                    let email = sessionStorage.getItem("email");
                    let cartItem_id = cartItem.cartItem_id;
                    const reqBody = {cartItem_id, email, quantity, subTotal, product};
                    let url = "http://localhost:8080/cartItem/update-cartItem/" + cartItem_id;
                    fetch(url,{
                        method:"PUT",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(reqBody)
                        })
                        .then((response)=>{
                            if(response.status===200){
				                fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
                			    .then(res=>res.json())
                                .then((result)=>{setCart(result);})
                                .catch((err)=>{
                                        console.log(err);
                                })
                                alert("Product was updated in your cart.");
                            }
                            else{
                                console.log(response);
                                alert("Failed to update cart item.");
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                }
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

    // Change navbar drop-down and buttons for user based on user role
    useLayoutEffect(()=>{
        if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "admin"){
            document.getElementById("listUsersListItem").style.display = "block";
            document.getElementById("adminLogoutListItem").style.display = "block";
            document.getElementById("addNewAdminListItem").style.display = "block";
            document.getElementById("listAllOrdersListItem").style.display = "block";
            document.getElementById("adminLoginListItem").style.display = "none";
            document.getElementById("sellerButton").style.display = "none";
            document.getElementById("customerButton").style.display = "none";
        }
        else if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "seller"){
            document.getElementById("customerButton").style.display = "none";
            document.getElementById("adminButton").style.display = "none";
            document.getElementById("sellerLoginListItem").style.display = "none";
            document.getElementById("sellerSignupListItem").style.display = "none";
            document.getElementById("addProductListItem").style.display = "block";
            document.getElementById("myProductsListItem").style.display = "block";
            document.getElementById("sellerLogoutListItem").style.display = "block";
        }
        else if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "customer"){
            document.getElementById("sellerButton").style.display = "none";
            document.getElementById("adminButton").style.display = "none";
            document.getElementById("customerLoginListItem").style.display = "none";
            document.getElementById("customerSignupListItem").style.display = "none";
            document.getElementById("customerLogoutListItem").style.display = "block";
            document.getElementById("customerMyOrdersItem").style.display = "block";
            document.getElementById("cartButton").style.display = "block";

            /* Used to display Add, Modify and Remove buttons on products based on whether they are 
                in the customer's cart or not */
            products.forEach(function(product){
                let flag = false;
                cart.forEach(function(cartItem){
                    if(product.product_id === cartItem.product.product_id){
                        flag = true;
                    }
                })
                if(!flag){
                    document.getElementById("add_" + product.product_id).style.display = "inline";
                    document.getElementById("remove_" + product.product_id).style.display = "none";
                    document.getElementById("modify_" + product.product_id).style.display = "none";
                }
                else{
                    document.getElementById("add_" + product.product_id).style.display = "none";
                    document.getElementById("remove_" + product.product_id).style.display = "inline";
                    document.getElementById("modify_" + product.product_id).style.display = "inline";
                }
            })
        }
    },[products, cart])

    // useEffect to fetch various things on initial render
    useEffect(()=>{
        if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "customer"){
            // If customer is logged in, fetching cart items
            fetch("http://localhost:8080/cartItem/get-cartItems/" + sessionStorage.getItem("email"))
                .then(res=>res.json())
                .then((result)=>{setCart(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }

        // Initially fetching and setting all products for display
	    if(value===undefined || value==="All"){
            fetch("http://localhost:8080/product/list-products")
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
        // Fetching products based on category selected
        else if(cats.includes(value)){
            let url = "http://localhost:8080/product/list-products-by-category/" + value
            fetch(url)
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
        // Fetching products based on sub-category selected
        else{
            let url = "http://localhost:8080/product/list-products-by-subcategory/" + value
            fetch(url)
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
                .catch((err)=>{
                    console.log(err);
                })
        }
    },[])

    return (
        <div className='min-vh-100'>
            {/* Navbar Start */}
            <nav className="navbar navbar-expand-xl justify-content-center mb-4 border rounded-5">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-around" id="navbarNav" style={{height: "50px"}}>
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown">
                                <Link className="dropdown-toggle btn mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    Electronics
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center'>
                                        <Link className='dropdown-item' onClick={()=>categoryfunc("Electronics")}>All</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Mobile")}>Mobile</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Laptop")}>Laptop</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Earphones")}>Earphones</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="dropdown-toggle btn mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    Clothing
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>categoryfunc("Clothing")}>All</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Shirts")}>Shirts</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Trousers")}>Trousers</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Sunglasses")}>Sunglasses</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="dropdown-toggle btn mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    Health
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>categoryfunc("Health")}>All</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Probiotics")}>Probiotics</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Cosmetics")}>Cosmetics</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="dropdown-toggle btn mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    Stationary
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>categoryfunc("Stationary")}>All</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Books")}>Books</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Paper")}>Paper</Link>
                                    </li>
                                    <li className='text-center'>
                                        <Link className="dropdown-item" onClick={()=>subCategoryfunc("Ink")}>Ink</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link onClick={()=>categoryfunc("Other")} className="btn mx-1 my-1" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    Other
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link onClick={()=>displayAll("All")} className="btn mx-1 my-1" style={{color: "#046380", backgroundColor: "white", width: "115px"}}>
                                    All
                                </Link>
                            </li>
                        </ul>
                        <ul className='navbar-nav ms-auto'>
                            <li className="nav-item dropdown" id="customerButton">
                                <Link className="nav-link dropdown-toggle mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
                                    Customer
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center' id='customerLoginListItem'>
                                        <Link className="dropdown-item" to={"/CustomerLogin"}>Customer Login</Link>
                                    </li>
                                    <li className='text-center' id='customerSignupListItem'>
                                        <Link className='dropdown-item' to={"/CustomerSignup"}>Customer Signup</Link>
                                    </li>
                                    <li className='text-center' id='customerMyOrdersItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Customer/MyOrders"}>My Orders</Link>
                                    </li>
                                    <li className='text-center' id='customerLogoutListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown" id="sellerButton">
                                <Link className="nav-link dropdown-toggle mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
                                    Seller
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center' id='sellerLoginListItem'>
                                        <Link className="dropdown-item" to={"/SellerLogin"}>Seller Login</Link>
                                    </li>
                                    <li className='text-center' id='sellerSignupListItem'>
                                        <Link className='dropdown-item' to={"/SellerSignup"}>Seller Signup</Link>
                                    </li>
                                    <li className='text-center' id='addProductListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Seller/AddProduct"}>Add Product</Link>
                                    </li>
                                    <li className='text-center' id='myProductsListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Seller/MyProducts"}>My Products</Link>
                                    </li>
                                    <li className='text-center' id='sellerLogoutListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown" id="adminButton">
                                <Link className="nav-link dropdown-toggle mx-1 my-1" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
                                    Admin
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center' id='adminLoginListItem'>
                                        <Link className="dropdown-item" to={"/AdminLogin"}>Admin Login</Link>
                                    </li>
                                    <li className='text-center' id='listUsersListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Admin/ListUsers"}>List Users</Link>
                                    </li>
                                    <li className='text-center' id='listAllOrdersListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Admin/AllOrders"}>List All Orders</Link>
                                    </li>
                                    <li className='text-center' id='addNewAdminListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/Admin/AddNewAdmin"}>Add New Admin</Link>
                                    </li>
                                    <li className='text-center' id='adminLogoutListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className='navbar-nav'>
                            <li className="nav-item" id="cartButton" style={{display: "none"}}>
                                <Link className="btn mx-1 my-1" role="button" to={"/Customer/Cart"}>
                                    <img src="/cart-icon.png" style={{height: "35px", width: "35px"}}></img>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}

            {/* Products Display Start */}
            {
                products.map(product=>(
                    <div className='container row px-3 pt-4 py-4 mb-4 mx-1 border border-3 rounded-5' style={{backgroundColor: "#A1E5FF", color: "black"}}>
                        <div className='col-lg-4 text-center'>
                            <img className='img-fluid border border-3 rounded-5' src={product.imageFilePath} style={{width: "300px", height: "300px", borderStyle: "solid", borderColor: "black", backgroundColor: "white"}}></img>
                            <div>
                                <button className='btn mt-3 mx-3' id={'add_' + product.product_id} style={{color: "white", backgroundColor: "#046380", display: "none"}} onClick={()=>add(product)}>Add to Cart</button>
                                <button className='btn mt-3 mx-3' id={'modify_' + product.product_id} style={{color: "white", backgroundColor: "#046380", display: "none"}} onClick={()=>modify(product)}>Modify</button>
				                <button className='btn mt-3 mx-3' id={'remove_' + product.product_id} style={{color: "white", backgroundColor: "#046380", display: "none"}}  onClick={()=>remove(product)}>Remove</button>
                            </div>               
                        </div>
                        <div className='col mt-1'>
                            <div className="row px-1">
                                <label className="col-sm-3">ID:</label>
                                <div className="col-sm-9">
                                    <label>{product.product_id}</label>
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Name:</label>
                                <div className="col-sm-9">
                                    <label>{product.name}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Short Summary:</label>
                                <div className="col-sm-9">
                                    <label>{product.short_summary}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Description:</label>
                                <div className="col-sm-9">
                                    <label>{product.description}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Price:</label>
                                <div className="col-sm-9">
                                    <label>&#8377;{product.price}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Weight:</label>
                                <div className="col-sm-9">
                                    <label>{product.weight}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Dimensions:</label>
                                <div className="col-sm-9">
                                    <label>{product.dimensions}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Category:</label>
                                <div className="col-sm-9">
                                    <label>{product.category}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Sub-Category:</label>
                                <div className="col-sm-9">
                                    <label>{product.subcategory}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Variant:</label>
                                <div className="col-sm-9">
                                    <label>{product.variant}</label>     
                                </div>
                            </div>
                            <div className="row px-1 pt-1">
                                <label className="col-sm-3">Seller Email:</label>
                                <div className="col-sm-9">
                                    <label>{product.sellerEmail}</label>     
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* Products Display End */}
        </div>
    );
}
export default Home;