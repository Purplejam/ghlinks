import React, { FunctionComponent } from "react";
import { Box, Modal, ModalProps } from "@mui/material";
import { RootStyles } from "./modal.styles";

export const SimpleModal: FunctionComponent<ModalProps> = (props) => {
    const { children, open, ...ModalProps } = props;
    const styles = RootStyles();

    return (
        <Modal
            { ...ModalProps }
            open={ open }
            sx={ styles.root }
        >
            <Box
                sx={ styles.box }
            >
                { children }
            </Box>
        </Modal>
    )
}