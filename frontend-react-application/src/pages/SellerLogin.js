import React from "react";
import '../App.css'
import { useState } from "react";

function SellerLogin(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const authenticate = async (event) => {
        event.preventDefault();
        const reqBody = {email, password};
        let url = "http://localhost:8080/seller_credentials/seller-login";
        fetch(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            }).then((response)=>{
                if(response.status===200){
                    alert("Login Successful");
                    sessionStorage.setItem("email",email);
                    sessionStorage.setItem("type","seller");
                    window.location.replace("/");
                }
                else if(response.status===406){
                    alert("Invalid Credentials");
                }
                else{
                    console.log(response);
                    alert("Error Occurred. Please check logs for detialed trace.");
                }
        });
    }

    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-5 text-center border rounded-4 border-2">
                <img class="img-fluid mt-4" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                <h2 class="mt-2 mb-3"> Seller Login</h2>
                <form onSubmit={authenticate}>
                    <div class="form-class mx-4">
                        <input class="form-control" type="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <div class="form-class mx-4">
                        <input class="form-control" type="password" id="password" minLength="8" maxLength="20" placeholder="Password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <button class="btn mt-4 mb-4" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
export default SellerLogin;