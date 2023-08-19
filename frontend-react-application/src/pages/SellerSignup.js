// Fraron Balsara

import React from "react";
import '../App.css'
import { useState } from "react";
import ButtonSpinner from "../hooks/ButtonSpinner";

function SellerSignup(){

    // Variable declarations and initializations
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mobile,setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [registerButtonLoading, setRegisterButtonLoading] = ButtonSpinner("Register", "Registering...");
    
    // On-click function for 'Register' button
    const addUser = async (event) => {
        event.preventDefault();
        // Checking if password matches confirm password
        if(password === password2){
            setRegisterButtonLoading(true);
            const reqBody = {name, address, email, mobile}
            console.log(reqBody);
            // Sending seller details to the backend server
            fetch("http://localhost:8080/seller/add-seller",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            })
            .then((response)=>{
                if(response.status===200){
                    const reqBody = {email, password}
                    /* Sending and setting password sepeartely to the backend server (Doing this so that 
                        when admin fetches customer and seller details, password is not retreived) */
                    fetch("http://localhost:8080/seller_credentials/add-seller-credentials",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(reqBody)
                    })
                    .then((response2)=>{
                        // On success redirecting to login page
                        if(response2.status===200){
                            alert("Seller signup successful.");
                            window.location.replace("/SellerLogin");
                        }
                        else{
                            alert("Fatal error occured.");
                            setRegisterButtonLoading(false);
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        alert("Error occured.");
                        setRegisterButtonLoading(false);
                    });
                }
                else if(response.status===500){
                    console.log(response);
                    alert("Seller signup unsucessful.");
		            setRegisterButtonLoading(false);
                }
                else{
                    console.log(response);
                    alert("Error occured.");
                    setRegisterButtonLoading(false);
                }
            })
            .catch((err)=>{
                console.log(err);
                alert("Error occured.");
                setRegisterButtonLoading(false);
            });
        }
        else{
            alert("Password does not match.");
            setRegisterButtonLoading(false);
        }
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 my-2">
            <div id="background-div" className="col-lg-6 text-left border border-primary rounded-4 border-3" style={{backgroundColor: "#A1E5FF"}}>
                <div className="text-center">
                    <img className="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                </div>
                <div className="text-center"><h2>Register - New Seller</h2></div>
                <form onSubmit={addUser}>
                    <div className="form-group row mt-2 px-5 py-2">
                        <label for="name" className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" id="name" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." value={name} onChange={(e)=>setName(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="email" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                        <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="password" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                        <input type="password" className="form-control" id="password" minLength="8" maxLength="20" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="confirmPassword" className="col-sm-3 col-form-label">Confirm Password</label>
                        <div className="col-sm-9 py-md-2">
                        <input type="password" className="form-control" id="confirmPassword" minLength="8" maxLength="20" value={password2} onChange={(e)=>setPassword2(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2 py-md-0">
                        <label for="mobile" className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                        <input type="tel" className="form-control" id="mobile" minLength="10" maxLength="10" pattern="^[7-9][0-9]{9}$" title="Enter a vlaid mobile number." value={mobile} onChange={(e)=>setMobile(e.target.value)} required></input>
                        </div>
                    </div>
                    <div className="form-group row px-5 py-2">
                        <label for="address" className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                        <textarea type="text" className="form-control" id="address" minLength="20" maxLength="150" value={address} onChange={(e)=>setAddress(e.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="text-center px-5 pt-2 pb-4"><button className="btn" type="submit" ref={registerButtonLoading}>Register</button></div>
                </form>
            </div>
        </div>
    );
}
export default SellerSignup;