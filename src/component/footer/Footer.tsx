import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component<any, any> {
    render() {
        return (
            <footer className="py-2 bg-color footer">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>
                </div>
            </footer>
        );
    }
}

export default Footer;
