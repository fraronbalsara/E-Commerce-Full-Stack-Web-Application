//Fraron Balsara

import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const Navbar = (props) => {
    useLayoutEffect(()=>{
	    document.getElementById("header").innerHTML = props.header;
    })
    return(
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
                        <ul className="navbar-nav my-2 ms-md-2">
                            <Link className="btn btn-lg fa fa-home" role="button" to={"/"} style={{color: "#046380", backgroundColor: "white", fontSize: "20px", height: "38px", width: "110px"}}>
                                &nbsp;Home
                            </Link>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-md-5 pe-md-5">
                            <h1 style={{color: "white"}} id="header">
                                
                            </h1>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
        </div>
    );
}
export default Navbar;