import React, { FunctionComponent, useContext, useEffect } from "react";
import { AuthorizedContent } from "../authorized/authorized.component";
import Cookies from "js-cookie";
import { UnauthorizedContent } from "../unauthorized/unauthorized.component";
import { getMySelf } from "../../api/users/users.api";
import { GlobalContext } from "../../app.component";

const getUser = async(dispatch: Function) => {
    const userToken = Cookies.get("userToken");
    if(!userToken) {
        return dispatch({
            user: null,
            isLoading: false
        })   
    }

    const user = await getMySelf();
    if(!user) {
        return dispatch({
            user: null,
            isLoading: false
        })  
    }

    dispatch({
        user: user,
        isLoading: false
    })
}

/**
 * Get application content 
 */
export const Content: FunctionComponent = () => {
    const [ context, setContext ] = useContext(GlobalContext);

    useEffect(() => {
        getUser(setContext);
    }, [])

    if(context.isLoading) {
        return null;
    }

    return (
        context.user ? <AuthorizedContent/> : <UnauthorizedContent/>
    )
}