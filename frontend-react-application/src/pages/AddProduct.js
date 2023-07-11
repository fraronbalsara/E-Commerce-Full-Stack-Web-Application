import React from "react";
import '../App.css'

function AddProduct(){
    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-6 text-left border border-primary rounded-4 border-2">
                <div class="text-center">
                    <img class="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                </div>
                <div class="text-center"><h2>Add New Product</h2></div>
                <form>
                    <div class="form-group row mt-2 px-5 py-2">
                        <label for="sku" class="col-sm-3 col-form-label">Sku</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="sku" pattern="[a-zA-Z0-9]+" title="No spaces or special characters allowed." required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="productName" class="col-sm-3 col-form-label">Product Name</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="productName" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="shortSummary" class="col-sm-3 col-form-label">Short Summary</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="shortSummary" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed."></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="description" class="col-sm-3 col-form-label">Description</label>
                        <div class="col-sm-9">
                        <textarea type="text" class="form-control" id="description"></textarea>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="price" class="col-sm-3 col-form-label">Price</label>
                        <div class="col-sm-9">
                        <input type="number" class="form-control" id="price" min="0" max="10000000" step=".01" required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="stock" class="col-sm-3 col-form-label">Stock</label>
                        <div class="col-sm-9">
                        <input type="number" class="form-control" id="stock" min="0" max="10000000"></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="weight" class="col-sm-3 col-form-label">Weight</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="weight" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed."></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="dimensions" class="col-sm-3 col-form-label">Dimensions</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="dimensions" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed."></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="variant" class="col-sm-3 col-form-label">Variant</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="variant" pattern="[a-zA-Z0-9\s]*$" title="No special characters allowed."></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="category" class="col-sm-3 col-form-label">Category</label>
                        <div class="col-sm-9">
                        <select class="form-select" id="category">
                            <option value="1">Category-One</option>
                            <option value="2">Category-Two</option>
                            <option value="3">Category-Three</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="subCategory" class="col-sm-3 col-form-label">Sub-Category</label>
                        <div class="col-sm-9">
                        <select class="form-select" id="subCategory">
                            <option value="1">Sub-Category-One</option>
                            <option value="2">Sub-Category-Two</option>
                            <option value="3">Sub-Category-Three</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="imageFile" class="col-sm-3 col-form-label">Product Image</label>
                        <div class="col-sm-9">
                        <input type="file" class="form-control-file" id="imageFile" accept="image/png,image/jpeg,image/jpg"></input>
                        </div>
                    </div>
                    <div id="error" class="text-center px-5 py-2" hidden>!!! Inavlid Details !!!</div>
                    <div class="text-center px-5 pt-2 pb-4"><button class="btn" type="submit">Submit</button></div>
                </form>
            </div>
        </div>
        
    );
}
export default AddProduct;