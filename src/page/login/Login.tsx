import React, { Component } from "react";
import "./Login.css";
import { spinnerService } from "../../service/spinner";
import { toast } from "react-toastify";
import { authService } from "../../service/auth";
import { Redirect } from "react-router";
const axios = require('axios');

class Login extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (authService.isAuthenticated) {
            <Redirect to={'listpost'} />
        }
    }

    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event: any) {
        event.preventDefault();
        spinnerService.showLoading(true);
        authService.login(this.state);
    }

    render() {
        return (
            <div className="div">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange} name="password" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}
export default Login; 