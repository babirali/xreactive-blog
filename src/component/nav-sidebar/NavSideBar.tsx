import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../service/auth";

class NavSidebar extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <Link className="nav-link" to="/listpost">List Post</Link>
                <Link className="nav-link" to="/addpost">Add Post</Link>
                <Link className="nav-link" to="/category">Category</Link>
                <Link className="nav-link" to="/tags">Tags</Link>
                <a className="nav-link" href="" onClick={() => authService.logout()}>Log Out</a>
            </div>
        );
    }
}
export default NavSidebar;
