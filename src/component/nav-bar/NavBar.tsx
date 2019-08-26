import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { authService } from "../../service/auth";

class NavBar extends Component<any, any> {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-color pt-5 pb-3">
                    <div className="container">
                        <Link className="" to="/"><img className="navbar-brand" src={require("../../assets/img/xreact-logo.png")} alt="" style={{ width: 50 }} /></Link>
                        {/* <Link className="navbar-brand" to="/">XReactive</Link> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            {/* <span className="navbar-toggler-icon" /> */}
                            <i className="fa fa-bars" style={{ color: "#35bdb2" }} />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                {/* <li className="nav-item">
                                    <Link className="nav-link link-hover link-active" to="/">Courses</Link>
                                </li> */}
                                <li className="nav-item ">
                                    <Link className="nav-link link-hover link-active" to="/">Blog</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link link-hover" to="/">Tutorials</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link link-hover" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-hover" to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
