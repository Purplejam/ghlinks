import { TComponentStyles } from "../../interfaces/common.interfaces";

export const RootStyles: TComponentStyles = () => ({
    root: {
        flex: 1,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    paper: {
        width: {
            md: "50%",
            sm: "100%",
            xs: "100%"
        },
        display: "flex",
        flexDirection: "column"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "3rem 2rem",
        gap: "2rem"
    }
})