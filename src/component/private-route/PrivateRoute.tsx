import React, { Component } from "react";
import { authService } from "../../service/auth";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isloggedIn: false
        }
        authService.getLoggedUser().subscribe(value => {
            this.setState({ isloggedIn: value })
        });

    }
    render() {
        return (
            <div>
                {
                    this.state.isloggedIn ?
                        <Route path={this.props.path} component={this.props.component} />
                        :
                        <Redirect
                            to={{
                                pathname: '/login'
                            }}
                        />
                }
            </div>

        );
    }
}
export default PrivateRoute;