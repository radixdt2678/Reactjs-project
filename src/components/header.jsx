import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../image/network.png'
import './header.css'


function Header (){
    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-4 d-flex align-items-center px-lg-5 fixed-top w-100 border-bottom shadow bg-white mb-5">
      <div className="container-fluid">
                <div className="">
                    <Link to="/">
                        <img src={logo} alt="" height={80}/>
                    </Link>                    
                </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex items-center gap-5 justify-content-start px-5 list-unstyled w-lg-100 pt-3">
                        <li><NavLink className="fs-3 fw-bold text-black text-uppercase nav-link " to="/">Home</NavLink></li>
                        <li><NavLink className="fs-3 fw-bold text-black text-uppercase nav-link " to="/">Register Form</NavLink>  </li>
                        <li><NavLink className="fs-3 fw-bold text-black text-uppercase nav-link " to="/listemp">List Employee</NavLink>  </li>
                        <li><NavLink className="fs-3 fw-bold text-black text-uppercase nav-link " to="/Profile">Profile</NavLink></li>
                        {/* <li><NavLink className="fs-3 fw-bold text-black text-uppercase " to="/Update">Update</NavLink></li> */}
                    </ul>
                </div>
      </div>
                
               
            </nav>
            
        </header>
    )
}

export default Header;