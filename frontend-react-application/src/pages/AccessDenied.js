// Fraron Balsara

import React from "react";

const AccessDenied = (props) => {
    return(
		<div className='d-flex flex-column align-items-center justify-content-center min-vh-100 text-center' style={{maxHeight: "100vh", maxWidth: "100%"}}>
			<div className="border border-3 rounded-5 px-5 py-5" style={{backgroundColor: "#A1E5FF"}}>
				<h1 style={{color: "red", fontSize: "80px"}}>ACCESS DENIED</h1>
				<h6 style={{fontSize: "25px"}}>You are not authorized to access this resource.</h6>
			</div>
		</div>
    );
}

export default AccessDenied;