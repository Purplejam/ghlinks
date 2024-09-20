import { TComponentStyles } from "../../interfaces/common.interfaces";

export const RootStyles: TComponentStyles = () => ({
    root: {
        display: "flex",
        fontSize: "16px",
        padding: {
            lg: "12px 96px",
            md: "12px 64px",
            sm: "12px 24px",
            xs: "12px 12px"
        },
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
        overflowY: "auto",
        height: "100%"
    }
})