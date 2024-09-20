import { Theme } from "@mui/material";
import { TComponentStyles } from "../../interfaces/common.interfaces";

const offsetTop = 150;

export const RootStyles: TComponentStyles = () => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        paddingTop: `${ offsetTop }px`
    }
})