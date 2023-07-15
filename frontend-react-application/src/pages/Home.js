import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Home = (props) => {

    const[products, setProducts] = useState([]);
    const[value, setValue] = useState();
    const cats = ["Electronics", "Clothing", "Health", "Stationary", "Other"] 
    const subcats = []
    

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
                                        <a className='dropdown-item' onClick={()=>categoryfunc("Electronics")}>All</a>
                                    </li>
                                    <li className='text-center'>
                                        <a className="dropdown-item" onClick={()=>subCategoryfunc("Mobile")}>Mobile</a>
                                    </li>
                                    <li className='text-center'>
                                        <a className="dropdown-item" onClick={()=>subCategoryfunc("Laptop")}>Laptop</a>
                                    </li>
                                    <li className='text-center'>
                                        <a className="dropdown-item" onClick={()=>subCategoryfunc("Earphones")}>Earphones</a>
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
                                        <a className="dropdown-item" onClick={()=>categoryfunc("Clothing")}>All</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Shirts")}>Shirts</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Trousers")}>Trousers</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Sunglasses")}>Sunglasses</a>
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
                                        <a onClick={()=>categoryfunc("Health")}>All</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Probiotics")}>Probiotics</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Cosmetics")}>Cosmetics</a>
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
                                        <a onClick={()=>categoryfunc("Stationary")}>All</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Books")}>Books</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Paper")}>Paper</a>
                                    </li>
                                    <li className='text-center'>
                                        <a onClick={()=>subCategoryfunc("Ink")}>Ink</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a onClick={()=>categoryfunc("Other")} className="nav-link">
                                    Other
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a onClick={()=>displayAll("All")} className="nav-link">
                                    All
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {
                products.map(product=>(
                    <div className='row px-3 py-4 mb-1 mx-1' style={{borderStyle: "solid", borderColor: "#046380"}}>
                        <div className='col-4'>
                            <img className='img-fluid' style={{width: "300px", height: "300px", borderStyle: "solid", borderColor: "black"}}></img>
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