import React from "react";
import { useNavigate } from "react-router";
const Header = () => {
    const history = useNavigate();
const handleOnClick = (e) => {
    e.preventDefault();
    localStorage.clear("access_token") 
    history("/login");
    
}
    return (
        <div>
            <>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">  
                        <a class="navbar-brand" href="#">Product Management</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <form class="float-left">
                                <div></div>
                                <div>
                                    {
                                        localStorage.getItem("access_token") ? <button onClick={handleOnClick} class="btn btn-outline-success" >logout</button> : <button class="btn btn-outline-success">Login</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
            </>
        </div>
    );
};

export default Header;
