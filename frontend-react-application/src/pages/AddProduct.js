import React, { useState } from "react";
import '../App.css'

function AddProduct(){

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "seller"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
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
    const [sellerEmail, setSellerEmail] = useState(sessionStorage.getItem('email'));

    let options = null;
    let categorySelected = null;

    const electronics = ["Mobile", "Laptop", "Earphones"];
    const clothing = ["Shirts", "Trousers", "Sunglasses"];
    const health = ["Probiotics", "Cosmetics"];
    const stationary = ["Books", "Paper", "Ink"];
    const other = ["Other"];

    // On-click function for 'Add Product' button
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

    // Event handler for setting initial value of Subcategory for each Category
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

    // Setting Subcategory list based on Category selected
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

    // Populating the list set from above to the dropdown
    if (categorySelected){
        options = categorySelected.map((e1)=><option key={e1}>{e1}</option>)
    }

    return(
        <div className="d-md-flex flex-column align-items-center justify-content-center min-vh-100 my-2">
            <div id="background-div" className="col-lg-6 text-center border border-primary rounded-4 border-2">
                <div className="text-center">
                    <img className="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo" />
                </div>
                <div className="text-center"><h2>Add New Product</h2></div>
                <form onSubmit={addProduct}>
                    <div className="form-group row mt-2 px-5 py-2">
                        <label for="productName" className="col-sm-3 col-form-label">Product Name</label>
                        <div className="col-sm-9 py-md-2">
                            <input type="text" className="form-control" id="productName" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." required value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="shortSummary" className="col-sm-3 col-form-label">Short Summary</label>
                        <div className="col-sm-9  py-md-2">
                            <input type="text" className="form-control" id="shortSummary" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={short_summary} onChange={(e) => setShort_summary(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="description" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="price" className="col-sm-3 col-form-label">Price</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="price" min="0" max="10000000" step=".01" required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="stock" className="col-sm-3 col-form-label">Stock</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="stock" min="0" max="10000000" required value={stock} onChange={(e) => setStock(parseInt(e.target.value))}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="weight" className="col-sm-3 col-form-label">Weight</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="weight" pattern="[a-zA-Z0-9.\s]*$" title="No special characters allowed." value={weight} onChange={(e) => setWeight(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="dimensions" className="col-sm-3 col-form-label">Dimensions</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="dimensions" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={dimensions} onChange={(e) => setDimensions(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="variant" className="col-sm-3 col-form-label">Variant</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="variant" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed." value={variant} onChange={(e) => setVariant(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="category" className="col-sm-3 col-form-label">Category</label>
                        <div className="col-sm-9">
                            <select className="form-select" id="category" value={category} onChange={handleChange}>
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
                            <select className="form-select" id="subCategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                {options}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="imageFile" className="col-sm-3 col-form-label">Product Image</label>
                        <div className="col-sm-9 py-md-2">
                            <input type="file" className="form-control-file" id="imageFile" accept="image/png,image/jpeg,image/jpg"></input>
                        </div>
                    </div>
                    <div className="text-center px-5 pt-2 pb-4"><button className="btn" type="submit">Submit</button></div>
                </form>
            </div>
        </div>
    );
}
export default AddProduct;