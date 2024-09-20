import React from "react";
import { RouteProps, Navigate } from "react-router-dom";
import { Profile } from "../../components/profile/profile.component";

/**
 * Routes for authorized users
 */
export const AuthorizedRoutes: RouteProps[] = [
    {
        path: "/",
        element: <Profile/>
    },
    {
        path: "*",
        element: <Navigate to={ "/" }/>
    },
]