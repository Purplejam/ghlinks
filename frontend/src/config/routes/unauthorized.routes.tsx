import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { Login } from "../../components/login/login.component";
import { Register } from "../../components/register/register.component";

/**
 * Routes for unauthorized users
 */
export const UnAuthorizedRoutes: RouteProps[] = [
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    },
    {
        path: "*",
        element: <Navigate to={ "/login" }/>
    }
]