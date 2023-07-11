import React from "react";
import '../App.css'

function Signup(){
    return(
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div id="background-div" class="col-lg-6 text-left border border-primary rounded-4 border-2">
                <div class="text-center">
                    <img class="img-fluid mt-4 mb-2" id="emart-logo" src="/emart-logo.png" alt="E-Mart logo"/>
                </div>
                <div class="text-center"><h2>Register - New User</h2></div>
                <form>
                    <div class="form-group row mt-2 px-5 py-2">
                        <label for="name" class="col-sm-3 col-form-label">Name</label>
                        <div class="col-sm-9">
                        <input type="text" class="form-control" id="name" pattern="[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" title="No numbers or special characters allowed." required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="email" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                        <input type="email" class="form-control" id="email" required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9">
                        <input type="password" class="form-control" id="password" minLength="8" maxLength="20" required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="confirmPassword" class="col-sm-3 col-form-label">Confirm Password</label>
                        <div class="col-sm-9">
                        <input type="password" class="form-control" id="confirmPassword" minLength="8" maxLength="20" required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="mobile" class="col-sm-3 col-form-label">Mobile</label>
                        <div class="col-sm-9">
                        <input type="tel" class="form-control" id="mobile" minLength="10" maxLength="10" pattern="^[7-9][0-9]{9}$" title="Enter a vlaid mobile number." required></input>
                        </div>
                    </div>
                    <div class="form-group row px-5 py-2">
                        <label for="address" class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-9">
                        <textarea type="text" class="form-control" id="address"></textarea>
                        </div>
                    </div>
                    <div id="error" class="text-center px-5 py-2" hidden>!!! Inavlid Details !!!</div>
                    <div class="text-center px-5 pt-2 pb-4"><button class="btn" type="submit">Register</button></div>
                </form>
            </div>
        </div>
    );
}
export default Signup;