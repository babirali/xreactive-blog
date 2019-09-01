import React, { Component, useState, useEffect } from "react";
import "./SideBar.css";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import AdComponent from "../ad-component/AdComponent";

const SideBar = () => {
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        spinnerService.showLoading(true);
        axios.get(process.env.API_ENDPOINT + "api/category").then((response: any) => {
            setCategories(response.data);
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            // console.log(error);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="col-md-3 pr-0">
            <div className="card mb-4 border-0">
                <h5 className="card-header border-0 text-uppercase text-dark">Search</h5>
                <div className="card-body p-0">
                    <div className="input-group position-relative">
                        <input type="text" className="form-control" placeholder="Search Post" />
                        {/* <div  className="position-absolute">
                            <p>test</p>
                            <p>test</p>
                            <p>test</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="card my-4 border-0">
                <h5 className="card-header text-uppercase border-0 text-dark">Categories</h5>
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="list-unstyled mb-0">
                                {categories.map((c, i) =>
                                    <li key={i}>
                                        <Link className={`cat-link ${window.location.pathname === "/login" ? "cat-link-active" : ""}`} to={`/post/${c.name}`}>{c.name}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-4 border-0">
                <h5 className="card-header border-0 text-uppercase text-dark">Social</h5>
                <div className="card-body p-0">
                    <div className="social-part ml-auto">
                        {/* <i className="fa fa-facebook twitter-social" aria-hidden="true"></i> */}
                        <a style={{ color: "#000" }} href="https://twitter.com/babirali001" target="_blank"><i className="fa fa-twitter twitter-social" aria-hidden="true" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
