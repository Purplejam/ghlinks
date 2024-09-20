import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { UnAuthorizedRoutes } from "../../config/routes/unauthorized.routes";

/**
 * Content for unauthorized users
 */
export const UnauthorizedContent: FunctionComponent = () => {
    return(
        <Routes>
            {
                UnAuthorizedRoutes.map((props, index) => (
                    <Route key={ index } { ...props } />
                ))
            }
        </Routes> 
    )
}