import React, { Component } from 'react';
import './SideBar.css'

class SideBar extends Component<any, any> {
    render() {
        return (
            <div className="col-md-4 pr-0">
                <div className="card mb-4 border-0">
                    <h5 className="card-header border-0 text-uppercase text-dark">Search</h5>
                    <div className="card-body">
                        <div className="input-group">
                            <input type="text" className="form-control rounded-0" placeholder="Search for..." />
                            <span className="input-group-btn">
                                <button className="btn btn-secondary rounded-0" type="button">Go!</button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card my-4 border-0">
                    <h5 className="card-header text-uppercase border-0 text-dark">Categories</h5>
                    <div className="card-body">
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
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul className="list-unstyled mb-0">
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
                <div className="card my-4 border-0">
                    <h5 className="card-header text-uppercase border-0 text-dark">Side Widget</h5>
                    <div className="card-body">
                        You can put anything you want inside of these side widgets.
                        They are easy to use, and feature the new Bootstrap 4 card containers!
                    </div>
                </div>

            </div>
        );
    }
}

export default SideBar;
