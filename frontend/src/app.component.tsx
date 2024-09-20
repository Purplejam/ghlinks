import React, { createContext, FunctionComponent, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { TGlobalContext } from "./interfaces/common.interfaces";
import { AppBody } from "./components/body/body.component";
import { BrowserRouter } from "react-router-dom";
import { Content } from "./sections/content/content.component";
import { Theme } from "./config/theme/theme.config";

export const GlobalContext = createContext({} as TGlobalContext);

const theme = createTheme(Theme);
  
const App: FunctionComponent = () => {
    const [ state, setState ] = useState({
        user: null,
        isLoading: true
    })
    
    return (
        <GlobalContext.Provider value={[ state, setState ]}>
            <ThemeProvider theme={ theme }>
                <CssBaseline/>
                <AppBody>
                    <BrowserRouter>
                        <Content/>
                    </BrowserRouter>
                </AppBody>
            </ThemeProvider>
        </GlobalContext.Provider >
    )
}

createRoot(document.getElementById("app")!).render(<App/>);