// Fraron Balsara

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../App.css'
import ButtonSpinner from "../hooks/ButtonSpinner";

function ModifyProduct(props){

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "seller"){
        window.location.replace("/AccessDenied");
    }

    // Extracting product_id from path
    let id = useLocation().pathname;
    id = id.split("/")[4]
    const product_id = parseInt(id);

    // Declaring variable for product
    const [product, setProduct] = useState('');
    const [modifyButtonLoading, setModifyButtonLoading] = ButtonSpinner("Modify Product", "Modifying Product...");

    // useEffect to fetch product details for particular product
    useEffect(()=>{
        let url = "http://localhost:8080/product/list-product/" + id;
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{
                setProduct(result);
                /* Checking if seller is trying to update their own product or a product 
                    belonging to another seller */
                if(result.sellerEmail !== sessionStorage.getItem("email")){
                    window.location.replace("/AccessDenied");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    // Initializing variables with original product information
    let name = product.name;
    let short_summary = product.short_summary;
    let description = product.description;
    let price = product.price;
    let stock = product.stock;
    let weight = product.weight;
    let dimensions = product.dimensions;
    let variant = product.variant;
    let imageFilePath = product.imageFilePath;
    const [imageFile, setImageFile] = useState();
    const category = product.category;
    const subcategory = product.subcategory;
    const sellerEmail = product.sellerEmail;
    const date_created = product.date_created;
    const date_modified = product.date_modified;

    function updateProduct(){
        const reqBody = {product_id, name, short_summary, description, price, stock, weight, dimensions, variant, category, subcategory, sellerEmail, date_created, date_modified, imageFilePath};
        let url = "http://localhost:8080/product/update-product/" + id;
        fetch(url,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            })
            .then((response)=>{
                if(response.status===200){
                    // On success redirecting to "My Products" page
                    alert("Product modified successfully");
                    window.location.replace("/Seller/MyProducts");
                }
                else{
                    console.log(response);
                    alert("Failed to modify product.");
                    setModifyButtonLoading(false);
                }
            })
            .catch((err)=>{
                console.log(err);
                setModifyButtonLoading(false);
            });
    }

    // On-click function for 'Modify' button
    const modifyProduct = async (event) => {
        event.preventDefault();
        setModifyButtonLoading(true);
        // If image file is attached
        if(imageFile){
            const formData = new FormData();
            formData.append('myFile', imageFile);
            fetch("http://localhost:8080/upload-file",{
            method:"POST",
            body:formData
            })
            .then((response)=>{
                imageFilePath = '/ProductImages/' + imageFile.name;
                if(response.status===200){
                    // Calling updateProduct function after uploading image
                    updateProduct();
                }
                else if(response.status===400){
                    console.log(response);
                    alert("Failed to modify product. Please upload an image file of type .jpeg, .jpg or .png");
                    setModifyButtonLoading(false);
                }
		        else{
                    console.log(response);
			        alert("Failed to modify product. Internal server error, please try again.");
                    setModifyButtonLoading(false);
		        }
            })
            .catch((err)=>{
                console.log(err);
                setModifyButtonLoading(false);
            });

        }
        // If image file is not attached
        else{
            // Calling updateProduct function
            updateProduct();
        }
    }
    
    return(
        <div className="d-md-flex flex-column align-items-center justify-content-center min-vh-100 my-2">
            <div id="background-div" className="col-lg-6 border border-primary rounded-4 border-3" style={{backgroundColor: "#A1E5FF"}}>
                <div className="text-center">
                    <img className="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo" />
                </div>
                <div className="text-center"><h2>Modify Product</h2></div>
                <form onSubmit={modifyProduct}>
                    <div className="form-group row mt-2 px-5 py-2">
                        <label for="productName" className="col-sm-3 col-form-label">Product Name</label>
                        <div className="col-sm-9 py-md-2">
                            <input type="text" className="form-control" id="productName" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." required defaultValue={product.name} onChange={(e) => name = e.target.value}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="shortSummary" className="col-sm-3 col-form-label">Short Summary</label>
                        <div className="col-sm-9 py-md-2">
                            <input type="text" className="form-control" id="shortSummary" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." required defaultValue={product.short_summary} onChange={(e) => short_summary = e.target.value}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="description" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <textarea type="text" className="form-control" id="description" required defaultValue={product.description} onChange={(e) => description = e.target.value}></textarea>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="price" className="col-sm-3 col-form-label">Price</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="price" min="0" max="10000000" step=".01" required defaultValue={product.price} onChange={(e) => price = parseFloat(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="stock" className="col-sm-3 col-form-label">Stock</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="stock" min="0" max="10000000" required defaultValue={product.stock} onChange={(e) => stock = parseInt(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="weight" className="col-sm-3 col-form-label">Weight</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="weight" pattern="[a-zA-Z0-9.\s]*$" title="No special characters allowed." defaultValue={product.weight} onChange={(e) => weight = e.target.value}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="dimensions" className="col-sm-3 col-form-label">Dimensions</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="dimensions" pattern="[a-zA-Z0-9.\s]*$" title="No special characters allowed." defaultValue={product.dimensions} onChange={(e) => dimensions = e.target.value}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="variant" className="col-sm-3 col-form-label">Variant</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="variant" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." defaultValue={product.variant} onChange={(e) => variant = e.target.value}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="category" className="col-sm-3 col-form-label">Category</label>
                        <div className="col-sm-9">
                            <select className="form-select" id="category" disabled value={product.category}>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Health</option>
                                <option>Stationary</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="subCategory" className="col-sm-3 col-form-label">Sub-Category</label>
                        <div className="col-sm-9 py-md-2">
                            <select className="form-select" id="subCategory" disabled value={product.subcategory}>
                                <option>Mobile</option>
                                <option>Laptop</option>
                                <option>Earphones</option>
                                <option>Shirts</option>
                                <option>Trousers</option>
                                <option>Sunglasses</option>
                                <option>Probiotics</option>
                                <option>Cosmetics</option>
                                <option>Books</option>
                                <option>Paper</option>
                                <option>Ink</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="imageFile" className="col-sm-3 col-form-label">Product Image</label>
                        <div className="col-sm-9 py-md-2">
                            <input type="file" className="form-control-file" id="imageFile" accept="image/png,image/jpeg,image/jpg" onChange={(e) => setImageFile(e.target.files[0])}></input>
                        </div>
                    </div>
                    <div className="text-center px-5 pt-2 pb-4"><button className="btn" type="submit" ref={modifyButtonLoading}>Modify Product</button></div>
                </form>
            </div>
        </div>
    );
}
export default ModifyProduct;