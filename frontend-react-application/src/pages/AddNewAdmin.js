import React from "react";
import '../App.css'
import { useState } from "react";

function AddNewAdmin(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const addNewAdminFunction = async (event) => {
        event.preventDefault();
        const reqBody = {email, password};
        let url = "http://localhost:8080/admin_credentials/add-admin-credentials";
        fetch(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reqBody)
            }).then((response)=>{
                if(response.status===200){
                    alert("New admin added successfully.");
                    window.location.replace("/");
                }
                else{
                    console.log(response);
                    alert("Error Occurred. Please check logs for detialed trace.");
                }
        });
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" className="col-lg-5 text-center border rounded-4 border-2">
                <img className="img-fluid mt-4" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                <h2 className="mt-2 mb-3">Add New Admin</h2>
                <form onSubmit={addNewAdminFunction}>
                    <div className="form-class mx-4">
                        <input className="form-control" type="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <div className="form-class mx-4">
                        <input className="form-control" type="password" id="password" minLength="8" maxLength="20" placeholder="Password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <button className="btn mt-4 mb-4" type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}
export default AddNewAdmin;