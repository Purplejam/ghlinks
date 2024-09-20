import React, { FormEvent, Fragment, FunctionComponent, useContext, useState } from "react";
import { Alert, Box, Button, Link, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import { RootStyles } from "./login.styles";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../api/users/users.api";
import { SimpleModal } from "../modals/default/modal.component";
import Cookies from "js-cookie";
import { GlobalContext } from "../../app.component";
import { IRootState } from "./login.interfaces";

export const Login: FunctionComponent = () => {
    const styles = RootStyles();
    const [ context, setContext ] = useContext(GlobalContext);
    const [ state, setState ] = useState<IRootState>({
        isLoading: false,
        email: "",
        password: "",
        isError: false
    })

    //Login submit handler
    const Login = async(event: FormEvent) => {
        event.preventDefault();
        setState(current => ({
            ...current,
            isLoading: true
        }))

        const user = await loginUser({
            email: state.email,
            password: state.password
        })
        if(!user) {
            return setState(current => ({
                ...current,
                isLoading: false,
                isError: true
            }))
        }

        Cookies.set("userToken", user.userToken, {
            expires: 1
        })
        setContext(current => ({
            ...current,
            user: user
        }))
        
        setState(current => ({
            ...current,
            isLoading: false
        }))
    }

    //Form handlers
    const ModalClose = () => {
        setState(current => ({
            ...current,
            isError: false
        }))
    }

    const ChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(current => ({
            ...current,
            email: event.target.value
        }))
    }

    const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(current => ({
            ...current,
            password: event.target.value
        }))
    }
    
    return(
        <Fragment>
            <Box sx={ styles.root }>
                <Paper sx={ styles.paper } elevation={ 2 }>
                    <Box 
                        component={ "form" } 
                        sx={ styles.form }
                        onSubmit={ Login }
                    >
                        <Typography variant={ "h4" } align={ "center" }>
                            { "Login" }
                        </Typography>
                        <TextField
                            size={ "small" }
                            type={ "email" }
                            label={ "email" }
                            name={ "email" }
                            color={ "secondary" }
                            value={ state.email }
                            onChange={ ChangeEmail }
                            fullWidth
                            required
                        />
                        <TextField
                            size={ "small" }
                            label={ "password" }
                            name={ "password" }
                            color={ "secondary" }
                            value={ state.password }
                            onChange={ ChangePassword }
                            fullWidth
                            required
                        />
                        {
                            state.isLoading ? (
                                <Box textAlign={ "center" }>
                                    <CircularProgress/>
                                </Box>
                            ) : (
                                <Button 
                                    type={ "submit" }
                                    fullWidth
                                    variant={ "contained" }
                                    disabled={ state.isLoading }
                                >
                                    { "Login" }
                                </Button>
                            )
                        }
                        <Typography
                            variant={ "body1" }
                            align={ "center" }
                        >
                            { "Don't have an account? " }
                            <Link
                                component={ NavLink }
                                to={ "/register" }
                            >
                                { "Click here." }
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            
            {/* Modal window */}
            <SimpleModal
                open={ state.isError }
                onClose={ ModalClose }
            >
                <Alert variant="filled" severity="warning">
                    { "Invalid Credentials" }
                </Alert> 
            </SimpleModal> 
        </Fragment>
    )
}