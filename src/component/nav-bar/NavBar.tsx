import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
class NavBar extends Component<any, any> {
    render() {
        return (
            <div>
                <div className="container">
                    <p>ttest</p>
                </div>
                <nav className="navbar navbar-expand-lg bg-color">
                    <div className="container">

                        <Link className="navbar-brand" to="/">XReactive</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    {/* <a className="nav-link" href="#">Home
                                    <span className="sr-only">(current)</span>
                                </a> */}
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">Angular</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/post/2">Post Detail</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                            <div className="social-part ml-auto">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
