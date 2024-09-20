import { Box } from "@mui/material";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { RootStyles } from "./body.styles";

export const AppBody: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const styles = RootStyles();
    
    return(
        <Box sx={ styles.root }>
            { children }
        </Box>
    )
}