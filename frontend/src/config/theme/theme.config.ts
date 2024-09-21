import { ThemeOptions } from "@mui/material";

export const Theme: ThemeOptions = {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    overflowY: "auto"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            },
            defaultProps: {
                elevation: 2
            }  
        },
        MuiButton: {
            defaultProps: {
                variant: "contained"
            }
        }
    }
}