import React, { Component } from "react";
import { authService } from "../../service/auth";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) => authService.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}
export default PrivateRoute;