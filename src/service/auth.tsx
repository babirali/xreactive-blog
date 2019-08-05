import React from "react";
import { Subject } from "rxjs";
import { toast } from "react-toastify";
import { spinnerService } from "./spinner";
import { Redirect } from "react-router";
import axios from "axios";

// const isloggedin = new Subject<boolean>();
// const isloggedin = false;

export const authService = {
    checkAuth: () => {
        const token = localStorage.getItem("token");
        if (token != null) {
            authService.isAuthenticated = true;
        } else {
            authService.isAuthenticated = false;
        }
    },
    isAuthenticated: false,
    login: (user: any, props: any) => {
        const userData = {
            user,
        };
        axios.post(process.env.API_ENDPOINT + "api/users/login", userData).then((response: any) => {
            localStorage.setItem("token", response.data.user.token);
            authService.isAuthenticated = true;
            spinnerService.showLoading(false);
            props.history.push("/listpost");
        }).catch((error: any) => {
            toast.error("Error");
            spinnerService.showLoading(false);
            // console.log(error);
        });
    },
    logout: () => {
        localStorage.removeItem("token");
        authService.isAuthenticated = false;
    },
    // getLoggedUser: () => isloggedin.asObservable(),

};
