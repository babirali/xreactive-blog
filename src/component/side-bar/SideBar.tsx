import React, { Component } from "react";
import "./SideBar.css";

class SideBar extends Component<any, any> {
    render() {
        return (
            <div className="col-md-3 pr-0">
                <div className="card mb-4 border-0">
                    <h5 className="card-header border-0 text-uppercase text-dark">Search</h5>
                    <div className="card-body p-0">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Post" />
                        </div>
                    </div>
                </div>
                {/* <div className="card my-4 border-0">
                    <h5 className="card-header text-uppercase border-0 text-dark">Categories</h5>
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <a href="#">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#">HTML</a>
                                    </li>
                                    <li>
                                        <a href="#">Freebies</a>
                                    </li>
                                    <li>
                                        <a href="#">JavaScript</a>
                                    </li>
                                    <li>
                                        <a href="#">CSS</a>
                                    </li>
                                    <li>
                                        <a href="#">Tutorials</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4 border-0">
                    <h5 className="card-header border-0 text-uppercase text-dark">Social</h5>
                    <div className="card-body p-0">
                        <div className="social-part ml-auto">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default SideBar;
