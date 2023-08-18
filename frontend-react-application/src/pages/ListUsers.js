// Fraron Balsara

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';

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

    // On-click function for 'Remove' button for customers
    function removeCustomerFunc(id, email){
        if(window.confirm("Are you sure you want to remove this customer from the system? You cannot undo this later.")){
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
                                    let url2 = "http://localhost:8080/customer/list-customers";
                                    fetch(url2)
                                        .then(res=>res.json())
                                        .then((result)=>{setCustomerDetails(result);})
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
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    }

    // On-click function for 'Remove' button for sellers
    function removeSellerFunc(id, email){
        if(window.confirm("Are you sure you want to remove this seller and all their products from the system? You cannot undo this later.")){
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
                                    let url = "http://localhost:8080/seller/list-sellers";
                                    fetch(url)
                                        .then(res=>res.json())
                                        .then((result)=>{setSellerDetails(result);})
                                        .catch((err)=>{
                                            console.log(err);
                                        });
                                })
                                .catch((err)=>{
                                    console.log(err);
                                    alert("Seller was removed but due to an internal error, failed to delete the products belonging to the seller.")
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
        <div className='min-vh-100'>
            <Navbar header="List Users"/>

            <div className="border border-3 rounded-5 pb-4" style={{backgroundColor: "#A1E5FF"}}>
                {/* List Customers Start */}
                <div className='text-center' style={{overflowX: "auto"}}>
                    <h2 className="text-center ms-md-4 mt-3">Customers</h2>
                    <table className='table mx-4'>
                        <tbody>
                            <tr style={{backgroundColor: "#A1E5FF"}}>
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
                                <td className='border border-2'><button className='btn' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>removeCustomerFunc(customer.customer_id, customer.email)}>Remove</button></td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                </div>
                {/* List Customers End */}
            
                {/* List Sellers Start */}
                <div className='text-center' style={{overflowX: "auto"}}>
                    <h2 className="text-center ms-md-4 mt-3">Sellers</h2>
                    <table className='table mx-4'>
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
                                <td className='border border-2'><button className='btn' style={{color: "white", backgroundColor: "#046380"}} onClick={()=>removeSellerFunc(seller.seller_id, seller.email)}>Remove</button></td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                </div>
                {/* List Sellers End */}
	        </div>
        </div>
    );
}
export default ListUsers;