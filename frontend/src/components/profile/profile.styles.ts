import { TComponentStyles } from "../../interfaces/common.interfaces";

export const RootStyles: TComponentStyles = () => ({
    root: {
        flex: 1,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
        overflowY: "auto"
    },
    appBar: {
        textAlign: "center",
        padding: "1rem",
        fontSize: "1.2rem",
        fontWeight: 600
    },
    modal: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "12px"
    },
    preloader: {
        textAlign: "center"
    }
})