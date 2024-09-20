import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoutes } from "../../config/routes/authorized.routes";

/**
 * Content for authorized users
 */
export const AuthorizedContent: FunctionComponent = () => {
    return(
        <Routes>
            {
                AuthorizedRoutes.map((props, index) => (
                    <Route key={ index } { ...props } />
                ))
            }
        </Routes> 
    )
}