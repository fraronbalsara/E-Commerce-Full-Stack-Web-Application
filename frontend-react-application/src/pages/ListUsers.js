import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const ListUsers = (props) => {

    const[sellerDetails, setSellerDetails] = useState([]);
    const[customerDetails, setCustomerDetails] = useState([]);

    useEffect(()=>{
        let url = "http://localhost:8080/seller/list-sellers";
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setSellerDetails(result);})
        let url2 = "http://localhost:8080/customer/list-customers";
        fetch(url2)
            .then(res=>res.json())
            .then((result)=>{setCustomerDetails(result);})
    },[])

    function deleteCustomerFunc(id, email){
        if(window.confirm("Are you sure you want to delete this customer? You cannot undo this later.")){
            let url = "http://localhost:8080/customer/delete-customer/" + id;
            console.log(url);
            fetch(url, {method: 'DELETE'})
            .then(()=>{
                let url = "http://localhost:8080/customer_credentials/delete-customer_credentials/" + email;
                console.log(url);
                fetch(url, {method: 'DELETE'})
                .then(()=>{
                    window.location.reload();
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    function deleteSellerFunc(id, email){
        if(window.confirm("Are you sure you want to delete this seller? You cannot undo this later.")){
            let url = "http://localhost:8080/seller/delete-seller/" + id;
            console.log(url);
            fetch(url, {method: 'DELETE'})
            .then(()=>{
                let url = "http://localhost:8080/seller_credentials/delete-seller_credentials/" + email;
                console.log(url);
                fetch(url, {method: 'DELETE'})
                .then(()=>{
                    let url = "http://localhost:8080/product/delete-products/" + email;
                    console.log(url);
                    fetch(url, {method: 'DELETE'})
                    .then(()=>{
                        window.location.reload();
                    })
                    .catch((err)=>{
                        console.log(err);
                        alert("Seller was deleted but due to an internal error, failed to delete the products belonging to the seller.")
                    })
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
            .catch((err)=>{
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
                    <div className="collapse navbar-collapse col-5 ms-3" id="navbarNav">
                        <ul className="navbar-nav ms-4">
                            <Link className="btn btn-lg" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "15px"}}>
                                Home
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
            <h2 className="text-center">Customers</h2>
            {
                customerDetails.map(customer=>(
                    <div className='container py-4 mb-2 mx-1 border border-2 rounded-5' style={{backgroundColor: "#046380", color: "white"}}>
                        <div className='mt-1 ms-3'>
                            <h6>ID:                    {customer.customer_id}</h6>
                            <h6>Name:                  {customer.name}</h6>
                            <h6>Email:                 {customer.email}</h6>
                            <h6>Mobile:                {customer.mobile}</h6>
                            <h6>Address:               {customer.address}</h6>
                            <h6>Account Created:       {customer.date_created}</h6>
                            <h6>Account Last Modified: {customer.date_modified}</h6>
                        </div>
                        <div>
                            <button className='btn btn mt-3 mx-3' style={{color: "#046380", backgroundColor: "white"}} onClick={()=>deleteCustomerFunc(customer.customer_id, customer.email)}>Delete</button>
                        </div>
                    </div>
                ))
            }
            <h2 className="text-center">Sellers</h2>
            {
                sellerDetails.map(seller=>(
                    <div className='container py-4 mb-2 mx-1 border border-2 rounded-5' style={{backgroundColor: "#046380", color: "white"}}>
                        <div className='mt-1 ms-3'>
                            <h6>ID:                    {seller.seller_id}</h6>
                            <h6>Name:                  {seller.name}</h6>
                            <h6>Email:                 {seller.email}</h6>
                            <h6>Mobile:                {seller.mobile}</h6>
                            <h6>Address:               {seller.address}</h6>
                            <h6>Account Created:       {seller.date_created}</h6>
                            <h6>Account Last Modified: {seller.date_modified}</h6>
                        </div>
                        <div>
                            <button className='btn btn mt-3 mx-3' style={{color: "#046380", backgroundColor: "white"}} onClick={()=>deleteSellerFunc(seller.seller_id, seller.email)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default ListUsers;