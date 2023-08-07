import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const MyProducts = (props) => {

    const[products, setProducts] = useState([]);
    const sellerEmail = sessionStorage.getItem("email");

    useEffect(()=>{
        let url = "http://localhost:8080/product/list-products-by-sellerEmail/" + sellerEmail;
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
    },[])

    function deleteFunc(product_id){
        if(window.confirm("Are you sure you want to delete this product? You cannot undo this later.")){
            let url = "http://localhost:8080/product/delete-product/" + product_id;
            console.log(url);
            fetch(url, {method: 'DELETE'})
                .then(()=>{
                    window.location.reload();
                })
                .catch((err)=>{
                    alert("Error! Failed to delete product.")
                    console.log(err);
                })
        }
    }

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
                    <div className="collapse navbar-collapse col-4" id="navbarNav">
                        <ul className="navbar-nav ms-4">
                            <Link className="btn btn-lg" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "15px"}}>
                                Home
                            </Link>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse col" id="navbarNav">
                        <ul className="navbar-nav">
                            <h1 style={{color: "white"}}>
                                My Products
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                products.map(product=>(
                    <div className='container row py-4 mb-2 mx-1 border border-2 rounded-5' style={{backgroundColor: "#046380", color: "white"}}>
                        <div className='col-4 text-center'>
                            <img className='img-fluid border rounded-5' src={product.imageFilePath} style={{width: "300px", height: "300px", borderStyle: "solid", borderColor: "black", backgroundColor: "white"}}></img>
                            <div>
                                <Link className='btn mt-3 mx-3' style={{color: "#046380", backgroundColor: "white"}} to={{pathname: "/Seller/MyProducts/ModifyProduct/" + product.product_id, state: {Products: products}}}>Modify</Link>
                                <button className='btn mt-3 mx-3' style={{color: "#046380", backgroundColor: "white"}} onClick={()=>deleteFunc(product.product_id)}>Delete</button>
                            </div>
                        </div>
                        <div className='col mt-1'>
                            <h6>ID:            {product.product_id}</h6>
                            <h6>Name:          {product.name}</h6>
                            <h6>Short Summary: {product.short_summary}</h6>
                            <h6>Description:   {product.description}</h6>
                            <h6>Price:  &#8377;{product.price}</h6>
                            <h6>Stock:         {product.stock}</h6>
                            <h6>Weight:        {product.weight}</h6>
                            <h6>Dimensions:    {product.dimensions}</h6>
                            <h6>Category:      {product.category}</h6>
                            <h6>Sub-category:  {product.subcategory}</h6>
                            <h6>Variant:       {product.variant}</h6>
                            <h6>Seller Email:  {product.sellerEmail}</h6>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default MyProducts;