// Fraron Balsara

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MyProducts = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "seller"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[products, setProducts] = useState([]);
    const sellerEmail = sessionStorage.getItem("email");

    // useEffect to fetch all product details pertaining to the seller
    useEffect(()=>{
        let url = "http://localhost:8080/product/list-products-by-sellerEmail/" + sellerEmail;
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setProducts(result);})
            .catch((err)=>{console.log(err);})
    },[])

    // On-click function for 'Delete' button
    function deleteFunc(product_id){
        if(window.confirm("Are you sure you want to delete this product? You cannot undo this later.")){
            let url = "http://localhost:8080/product/delete-product/" + product_id;
            console.log(url);
            fetch(url, {method: 'DELETE'})
                .then(()=>{
                    let url = "http://localhost:8080/product/list-products-by-sellerEmail/" + sellerEmail;
                    fetch(url)
                        .then(res=>res.json())
                        .then((result)=>{setProducts(result);})
                        .catch((err)=>{console.log(err);})
                })
                .catch((err)=>{
                    alert("Error! Failed to delete product.")
                    console.log(err);
                });
        }
    }

    return (
        <div className='min-vh-100'>
            <Navbar header="My Products"/>

            {/* My Products Display Start */}
            {
                products.map(product=>(
                    <div className='container row py-4 mb-2 mx-1 border border-3 rounded-5' style={{backgroundColor: "#A1E5FF", color: "black"}}>
                        <div className='col-lg-4 text-center'>
                            <img className='img-fluid border border-3 rounded-5' src={product.imageFilePath} style={{width: "300px", height: "300px", borderStyle: "solid", borderColor: "black", backgroundColor: "white"}}></img>
                            <div className='text-center'>
                                <Link className='btn mt-3 mx-3' style={{color: "white", backgroundColor: "#046380"}} to={{pathname: "/Seller/MyProducts/ModifyProduct/" + product.product_id}}>Modify</Link>
                                <button className='btn mt-3 mx-3' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>deleteFunc(product.product_id)}>Delete</button>
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
                                <label className="col-sm-3">Stock:</label>
                                <div className="col-sm-9">
                                    <label>{product.stock}</label>     
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
            {/* My Products Display End */}
        </div>
    );
}
export default MyProducts;