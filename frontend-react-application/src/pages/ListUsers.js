import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const ListUsers = (props) => {

    // Checking if user has access
    if(sessionStorage.getItem("email") === null || sessionStorage.getItem("type") !== "admin"){
        window.location.replace("/AccessDenied");
    }

    // Variable declarations and initializations
    const[sellerDetails, setSellerDetails] = useState([]);
    const[customerDetails, setCustomerDetails] = useState([]);

    // Fetching all customer and seller details (excluding passwords)
    useEffect(()=>{
        let url = "http://localhost:8080/seller/list-sellers";
        fetch(url)
            .then(res=>res.json())
            .then((result)=>{setSellerDetails(result);})
            .catch((err)=>{
                console.log(err);
            });
        let url2 = "http://localhost:8080/customer/list-customers";
        fetch(url2)
            .then(res=>res.json())
            .then((result)=>{setCustomerDetails(result);})
            .catch((err)=>{
                console.log(err);
            });
    },[])

    // On-click function for 'Delete' button for customers
    function deleteCustomerFunc(id, email){
        if(window.confirm("Are you sure you want to delete this customer? You cannot undo this later.")){
            let url = "http://localhost:8080/customer/delete-customer/" + id;
            // Deleting customer details from backend server
            fetch(url, {method: 'DELETE'})
                .then(()=>{
                    let url = "http://localhost:8080/customer_credentials/delete-customer_credentials/" + email;
                    // Deleting customer credentials from backend server
                    fetch(url, {method: 'DELETE'})
                        .then(()=>{
                            // Deleting customer cart items
                            fetch("http://localhost:8080/cartItem/delete-cartItems/" + email, {method: 'DELETE'})
                                .then(()=>{
                                    window.location.reload();
                                })
                                .catch((err)=>{
                                    console.log(err);
                                });
                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    }

    // On-click function for 'Delete' button for sellers
    function deleteSellerFunc(id, email){
        if(window.confirm("Are you sure you want to delete this seller? You cannot undo this later.")){
            let url = "http://localhost:8080/seller/delete-seller/" + id;
            // Deleting seller details from backend server
            fetch(url, {method: 'DELETE'})
                .then(()=>{
                    let url = "http://localhost:8080/seller_credentials/delete-seller_credentials/" + email;
                    // Deleting seller credentials from backend server
                    fetch(url, {method: 'DELETE'})
                        .then(()=>{
                            let url = "http://localhost:8080/product/delete-products/" + email;
                            // Deleting all products belonging to the seller
                            fetch(url, {method: 'DELETE'})
                                .then(()=>{
                                    window.location.reload();
                                })
                                .catch((err)=>{
                                    console.log(err);
                                    alert("Seller was deleted but due to an internal error, failed to delete the products belonging to the seller.")
                                });
                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    }

    return (
        <div>
            {/* Navbar Start */}
            <nav className="navbar navbar-expand-md justify-content-center mb-4 border rounded-5">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav  my-2 ms-md-2">
                            <Link className="btn btn-lg" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "15px", width: "100px"}}>
                                Home
                            </Link>
                        </ul>
                    </div>
		        <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-md-5 pe-md-5">
                            <h1 style={{color: "white"}}>
                                List Users
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}

            {/* List Customers Start */}
            <div className='text-center' style={{overflowX: "auto"}}>
                <h2 className="text-center ms-md-3">Customers</h2>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th className='border border-2'>ID</th>
                            <th className='border border-2'>Name</th>
                            <th className='border border-2'>Email</th>
                            <th className='border border-2'>Mobile</th>
                            <th className='border border-2'>Address</th>
                            <th className='border border-2'>Account Created</th>
                            <th className='border border-2'>Account Last Modified</th>
                            <th className='border border-2'>Action</th>
                        </tr>
                    {    	
                    customerDetails.map(customer=>(
                        <tr>
                            <td className='border border-2'>{customer.customer_id}</td>
                            <td className='border border-2'>{customer.name}</td>
                            <td className='border border-2'>{customer.email}</td>
                            <td className='border border-2'>{customer.mobile}</td>
                            <td className='border border-2'>{customer.address}</td>
                            <td className='border border-2'>{new Date(customer.date_created).toLocaleString("en-IN")}</td>
                            <td className='border border-2'>{new Date(customer.date_modified).toLocaleString("en-IN")}</td>
                            <td className='border border-2'><button className='btn' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>deleteCustomerFunc(customer.customer_id, customer.email)}>Delete</button></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
            {/* List Customers End */}
            
            {/* List Sellers Start */}
            <div className='text-center' style={{overflowX: "auto"}}>
                <h2 className="text-center ms-md-3">Sellers</h2>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th className='border border-2'>ID</th>
                            <th className='border border-2'>Name</th>
                            <th className='border border-2'>Email</th>
                            <th className='border border-2'>Mobile</th>
                            <th className='border border-2'>Address</th>
                            <th className='border border-2'>Account Created</th>
                            <th className='border border-2'>Account Last Modified</th>
                            <th className='border border-2'>Action</th>
                        </tr>
                    {    	
                    sellerDetails.map(seller=>(
                        <tr>
                            <td className='border border-2'>{seller.seller_id}</td>
                            <td className='border border-2'>{seller.name}</td>
                            <td className='border border-2'>{seller.email}</td>
                            <td className='border border-2'>{seller.mobile}</td>
                            <td className='border border-2'>{seller.address}</td>
                            <td className='border border-2'>{new Date(seller.date_created).toLocaleString("en-IN")}</td>
                            <td className='border border-2'>{new Date(seller.date_modified).toLocaleString("en-IN")}</td>
                            <td className='border border-2'><button className='btn' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>deleteSellerFunc(seller.seller_id, seller.email)}>Delete</button></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
            {/* List Sellers End */}
        </div>
    );
}
export default ListUsers;