import React, { useState } from "react";
import '../App.css'

function AddProduct(){
    const [name, setName] = useState('');
    const [short_summary, setShort_summary] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [weight, setWeight] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [variant, setVariant] = useState('');
    const [imageFilePath, setImageFilePath] = useState('/ProductImages/defaultProductImage.jpg');
    const [category, setCategory] = useState('Electronics');
    const [subcategory, setSubcategory] = useState('Mobile');
    const [sellerEmail, setSellerEmail] =useState(sessionStorage.getItem('email'));

    let options = null;
    let categorySelected = null;

    const electronics = ["Mobile", "Laptop", "Earphones"];
    const clothing = ["Shirts", "Trousers", "Sunglasses"];
    const health = ["Probiotics", "Cosmetics"];
    const stationary = ["Books", "Paper", "Ink"];
    const other = ["Other"];

    const addProduct = async (event) => {
        event.preventDefault();
        console.log(imageFilePath);
        const reqBody = {name, short_summary, description, price, stock, weight, dimensions, variant, category, subcategory, sellerEmail, imageFilePath};
        console.log(reqBody);
        fetch("http://localhost:8080/product/add-product",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            }).then((response)=>{
                if(response.status===200){
                    alert("Product added successfully");
                    window.location.replace("/");
                }
                else{
                    console.log(response);
                    alert("Failed to add product.");
                }
            });
        if(imageFilePath.name){
            const formData = new FormData();
            formData.append('myFile', imageFilePath, imageFilePath.name);
            console.log(imageFilePath);
            for(let pair of formData.entries()){
                console.log(pair[0]+ ', ' + pair[1]);
            }
        }
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
        if (event.target.value==="Electronics"){
            setSubcategory("Mobile");
        }
        else if (event.target.value==="Clothing"){
            setSubcategory("Shirts");
        }
        else if (event.target.value==="Health"){
            setSubcategory("Probiotics");
        }
        else if (event.target.value==="Stationary"){
            setSubcategory("Books");
        }
        else if (event.target.value==="Other"){
            setSubcategory("Other");
        }
    }

    if (category==="Electronics"){
        categorySelected = electronics;
    }
    else if (category==="Clothing"){
        categorySelected = clothing;
    }
    else if (category==="Health"){
        categorySelected = health;
    }
    else if (category==="Stationary"){
        categorySelected = stationary;
    }
    else if (category==="Other"){
        categorySelected = other;
    }

    if (categorySelected){
        options = categorySelected.map((e1)=><option key={e1}>{e1}</option>)
    }

    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-6 text-left border border-primary rounded-4 border-2">
                <div class="text-center">
                    <img class="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo" />
                </div>
                <div class="text-center"><h2>Add New Product</h2></div>
                <form onSubmit={addProduct}>
                    <div class="form-group row mt-2 px-5 py-2">
                        <label for="productName" class="col-sm-3 col-form-label">Product Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="productName" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." required value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="shortSummary" class="col-sm-3 col-form-label">Short Summary</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="shortSummary" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={short_summary} onChange={(e) => setShort_summary(e.target.value)}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="description" class="col-sm-3 col-form-label">Description</label>
                        <div class="col-sm-9">
                            <textarea type="text" class="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="price" class="col-sm-3 col-form-label">Price</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" id="price" min="0" max="10000000" step=".01" required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="stock" class="col-sm-3 col-form-label">Stock</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" id="stock" min="0" max="10000000" required value={stock} onChange={(e) => setStock(parseInt(e.target.value))}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="weight" class="col-sm-3 col-form-label">Weight</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="weight" pattern="[a-zA-Z0-9.\s]*$" title="No special characters allowed." value={weight} onChange={(e) => setWeight(e.target.value)}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="dimensions" class="col-sm-3 col-form-label">Dimensions</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="dimensions" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={dimensions} onChange={(e) => setDimensions(e.target.value)}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="variant" class="col-sm-3 col-form-label">Variant</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="variant" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={variant} onChange={(e) => setVariant(e.target.value)}></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="category" class="col-sm-3 col-form-label">Category</label>
                        <div class="col-sm-9">
                            <select class="form-select" id="category" value={category} onChange={handleChange}>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Health</option>
                                <option>Stationary</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="subCategory" class="col-sm-3 col-form-label">Sub-Category</label>
                        <div class="col-sm-9">
                            <select class="form-select" id="subCategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                {options}
                            </select>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="imageFile" class="col-sm-3 col-form-label">Product Image</label>
                        <div class="col-sm-9">
                            <input type="file" class="form-control-file" id="imageFile" accept="image/png,image/jpeg,image/jpg" onChange={(e) => setImageFilePath(e.target.files[0])}></input>
                        </div>
                    </div>
                    <div class="text-center px-5 pt-2 pb-4"><button class="btn" type="submit">Submit</button></div>
                </form>
            </div>
        </div>
    );
}
export default AddProduct;