import React from "react";
import '../App.css'
import { useState } from "react";

function CustomerSignup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mobile,setMobile] = useState('');
    const [address, setAddress] = useState('');
    
    const addUser = async (event) => {
        event.preventDefault();
        if(password === password2){
            const reqBody = {name, address, email, mobile}
            fetch("http://localhost:8080/customer/add-customer",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            })
            .then((response)=>{
                if(response.status===200){
                    const reqBody = {email, password}
                    fetch("http://localhost:8080/customer_credentials/add-customer-credentials",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(reqBody)
                    })
                    .then((response2)=>{
                        if(response2.status===200){
                            alert("Customer signup successful.");
                        }
                        else{
                            alert("Fatal error occured.")
                        }
                    })
                }
                else if(response.status===500){
                    console.log(response);
                    alert("Customer signup unsucessful.");
                }
            });
        }
        else{
            alert("Password does not match.")
        }
    }

    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-6 text-left border border-primary rounded-4 border-2">
                <div class="text-center">
                    <img class="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                </div>
                <div class="text-center"><h2>Register - New Customer</h2></div>
                <form onSubmit={addUser}>
                    <div class="form-group row mt-2 px-5 py-2">
                        <label for="name" class="col-sm-3 col-form-label">Name</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="name" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." value={name} onChange={(e)=>setName(e.target.value)} required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="email" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                        <input type="email" class="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9">
                        <input type="password" class="form-control" id="password" minLength="8" maxLength="20" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="confirmPassword" class="col-sm-3 col-form-label">Confirm Password</label>
                        <div class="col-sm-9">
                        <input type="password" class="form-control" id="confirmPassword" minLength="8" maxLength="20" value={password2} onChange={(e)=>setPassword2(e.target.value)} required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="mobile" class="col-sm-3 col-form-label">Mobile</label>
                        <div class="col-sm-9">
                        <input type="tel" class="form-control" id="mobile" minLength="10" maxLength="10" pattern="^[7-9][0-9]{9}$" title="Enter a vlaid mobile number." value={mobile} onChange={(e)=>setMobile(e.target.value)} required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="address" class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-9">
                        <textarea type="text" class="form-control" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div id="error" class="text-center px-5 py-2" hidden>!!! Inavlid Details !!!</div>
                    <div class="text-center px-5 pt-2 pb-4"><button class="btn" type="submit">Register</button></div>
                </form>
            </div>
        </div>
    );
}
export default CustomerSignup;