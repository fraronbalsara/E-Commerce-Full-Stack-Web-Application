import React from "react";
import '../App.css'

function Login(){
    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-5 text-center border rounded-4 border-2">
                <img class="img-fluid mt-4" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                <h2 class="mt-2 mb-3">Login</h2>
                <form method="post" onsubmit="return authenticate();">
                    <div class="form-class mx-4">
                        <input class="form-control" type="email" id="email" placeholder="Email" required></input>
                    </div>
                    <br></br>
                    <div class="form-class mx-4">
                        <input class="form-control" type="password" id="password" minlength="8" maxlength="20" placeholder="Password" autocomplete="off" required></input>
                    </div>
                    <br></br>
                    <div id="error">!!! Inavlid username or password !!!</div>
                    <button class="btn mt-4 mb-4" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
export default Login;