import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = (props) => {

    const[products, setProducts] = useState([]);
    const[value, setValue] = useState();
    const cats = ["Electronics", "Clothing", "Health", "Stationary", "Other"];
    
    function logout(){
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("type");
        window.location.replace("/");
    }

    function categoryfunc(category){
        setValue(category)
        let url = "http://localhost:8080/product/list-products-by-category/" + category
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
        console.log(value);
    
    }
    function subCategoryfunc(subCategory){
        setValue(subCategory)
        let url = "http://localhost:8080/product/list-products-by-subcategory/" + subCategory
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
    }

    function displayAll(all){
        setValue(all)
        fetch("http://localhost:8080/product/list-products")
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
    } 

    useEffect(()=>{
        
        if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "seller"){
            document.getElementById("customerButton").style.display = "none";
            document.getElementById("sellerLoginListItem").style.display = "none";
            document.getElementById("sellerSignupListItem").style.display = "none";
            document.getElementById("addProductListItem").style.display = "block";
            document.getElementById("sellerLogoutListItem").style.display = "block";
        }
        else if(sessionStorage.getItem("email") != null && sessionStorage.getItem("type") === "customer"){
            document.getElementById("customerLoginListItem").style.display = "none";
            document.getElementById("customerSignupListItem").style.display = "none";
            document.getElementById("customerLogoutListItem").style.display = "block";
            document.getElementById("sellerButton").style.display = "none";
        }
        else{
            document.getElementById("addProductListItem").style.display = "none";
            document.getElementById("customerButton").style.display = "block";
            document.getElementById("customerLoginListItem").style.display = "block";
            document.getElementById("customerSignupListItem").style.display = "block";
            document.getElementById("customerLogoutListItem").style.display = "none";
            document.getElementById("sellerButton").style.display = "block";
            document.getElementById("sellerLoginListItem").style.display = "block";
            document.getElementById("sellerSignupListItem").style.display = "block";
            document.getElementById("sellerLogoutListItem").style.display = "none";
            
        }
        if(value===undefined || value==="All"){
            fetch("http://localhost:8080/product/list-products")
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
        }
        else if(cats.includes(value)){
            let url = "http://localhost:8080/product/list-products-by-category/" + value
            fetch(url)
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
        }
        else{
            let url = "http://localhost:8080/product/list-products-by-subcategory/" + value
            fetch(url)
                .then(res=>res.json())
                .then((result)=>{setProducts(result);})
        }
    },[])

    return (
        <div>
            <nav className="navbar navbar-expand-lg justify-content-center mb-4">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-around" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
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
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
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
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
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
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
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
                                <Link onClick={()=>categoryfunc("Other")} className="nav-link">
                                    Other
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link onClick={()=>displayAll("All")} className="nav-link">
                                    All
                                </Link>
                            </li>
                        </ul>
                        <ul className='navbar-nav'>
                            <li className="nav-item dropdown" id="customerButton">
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
                                    Customer
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center' id='customerLoginListItem'>
                                        <Link className="dropdown-item" to={"CustomerLogin"}>Customer Login</Link>
                                    </li>
                                    <li className='text-center' id='customerSignupListItem'>
                                        <Link className='dropdown-item' to={"/CustomerSignup"}>Customer Signup</Link>
                                    </li>
                                    <li className='text-center' id='customerLogoutListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown" id="sellerButton">
                                <Link className="nav-link dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" arai-expanded="false">
                                    Seller
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className='text-center' id='sellerLoginListItem'>
                                        <Link className="dropdown-item" to={"SellerLogin"}>Seller Login</Link>
                                    </li>
                                    <li className='text-center' id='sellerSignupListItem'>
                                        <Link className='dropdown-item' to={"/SellerSignup"}>Seller Signup</Link>
                                    </li>
                                    <li className='text-center' id='addProductListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' to={"/AddProduct"}>Add Product</Link>
                                    </li>
                                    <li className='text-center' id='sellerLogoutListItem' style={{display: "none"}}>
                                        <Link className='dropdown-item' onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {
                products.map(product=>(
                    <div className='row px-3 py-4 mb-1 mx-1' style={{borderStyle: "solid", borderColor: "#046380"}}>
                        <div className='col-4'>
                            <img className='img-fluid' src={product.imageFilePath} style={{width: "300px", height: "300px", borderStyle: "solid", borderColor: "black"}}></img>
                        </div>
                        <div className='col mt-1'>
                            <h6>ID:            {product.product_id}</h6>
                            <h6>Name:          {product.name}</h6>
                            <h6>Short Summary: {product.short_summary}</h6>
                            <h6>Description:   {product.description}</h6>
                            <h6>Price:         {product.price}</h6>
                            <h6>Stock:         {product.stock}</h6>
                            <h6>Weight:        {product.weight}</h6>
                            <h6>Dimensions:    {product.dimensions}</h6>
                            <h6>Category:      {product.category}</h6>
                            <h6>Sub-category:  {product.subcategory}</h6>
                            <h6>Variant:       {product.variant}</h6>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default Home;