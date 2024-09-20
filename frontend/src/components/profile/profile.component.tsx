import React, { Fragment, FunctionComponent, useContext, useState, FormEvent, useEffect } from "react";
import { 
    AppBar, 
    Box, 
    Fab, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Button, 
    IconButton, 
    CircularProgress, 
    Alert 
} from "@mui/material";
import { GlobalContext } from "../../app.component"
import { RootStyles } from "./profile.styles";
import { GitHub as AddIcon, Delete } from "@mui/icons-material";
import { SimpleModal } from "../modals/default/modal.component";
import { createRepo, deleteRepo, findAllRepos } from "../../api/repos/repos.api";
import { Link } from "react-router-dom";
import { IRootState } from "./profile.interfaces";

const TableHeaders = [
    "Owner", "Name", "URL", "Stars", "Forks", "Issues",  ""
]

export const Profile: FunctionComponent = () => {
    const [ context, setContext ] = useContext(GlobalContext);
    const styles = RootStyles();
    const [ state, setState ] = useState<IRootState>({
        isLoading: false,
        repos: [],
        name: "",
        isError: false, 
        open: false
    })

    //Search and add a new repo
    const SubmitRepo = async(event: FormEvent) => {
        event.preventDefault();
        setState(current => ({
            ...current,
            isLoading: true,
            isError: false,
            open: true
        }))

        const result = await createRepo({
            name: state.name
        })
        if(!result) {
            return setState(current => ({
                ...current,
                open: false,
                isError: true,
                isLoading: false,
                name: "",
            }))
        }

        setState(current => ({
            ...current,
            open: false,
            repos: [ 
                result,
                ...current.repos, 
            ],
            isLoading: false,
            name: "",
        }))
        ModalClose();
    }

    //Load users repos on inital load
    const InitialLoad = async() => {
        setState(current => ({
            ...current,
            isLoading: true,
            isError: false,
        }))

        const repos = await findAllRepos({});
        if(!repos) {
            return setState(current => ({
                ...current,
                isError: true,
                isLoading: false
            }))
        }
    
        setState(current => ({
            ...current,
            isLoading: false,
            repos: repos
        }))
    }

    //Delete repo 
    const DeleteRepo = async(id: number) => {
        setState(current => ({
            ...current,
            isLoading: true,
            isError: false
        }))

        const result = await deleteRepo({
            id: id
        })
        if(!result) {
            return setState(current => ({
                ...current,
                open: false,
                isError: true,
                isLoading: false
            }))
        }
        const newRepos = state.repos.filter((repo) => repo.id !== id);

        setState(current => ({
            ...current,
            open: false,
            repos: newRepos,
            isLoading: false
        }))
    }

    //Form handlers
    const ChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(current => ({
            ...current,
            name: event.target.value
        }))
    }

    //Modal handlers
    const ModalClose = () => {
        setState(current => ({
            ...current,
            open: false
        }))
    }

    const ModalOpen = () => {
        setState(current => ({
            ...current,
            open: true
        }))
    }

    useEffect(() =>{
        InitialLoad();
    }, [])
    
    if(!context.user) {
        return null;
    }
    return(
        <Fragment>
            <Box sx={ styles.root }>
                <AppBar sx={ styles.appBar }>
                    { "ghLinks App" } 
                </AppBar>
                <Fab 
                    color={ "secondary" }
                    sx={{ m: 2 }} 
                    variant={ "extended" }
                    onClick={ ModalOpen }
                >
                    <AddIcon sx={{ mr: 1 }}/> 
                    { "Add repo" }
                </Fab>
                {
                    state.isError && (
                        <Alert 
                            variant="filled" 
                            severity="warning">
                                { "Repos not found or already been saved" }
                        </Alert>
                    )
                } 
                <TableContainer component={ Paper }>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {
                                    TableHeaders.map((header, index) => (
                                        <TableCell key={ index }>{ header }</TableCell>  
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        {
                            state.isLoading ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={ 7 } sx={ styles.preloader }>
                                            <CircularProgress/>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            ) : (
                            <TableBody>
                                {
                                    state.repos.map((repo, index) => (
                                        <TableRow key={ index }>
                                            <TableCell>{ repo.owner }</TableCell>
                                            <TableCell>{ repo.project_name }</TableCell>
                                            <TableCell>
                                                <Link 
                                                    to={ `${ repo.project_url }` }
                                                    target={ "_blank" }
                                                    rel={ "noopener noreferrer" }
                                                >
                                                    { repo.project_url }
                                                </Link>
                                            </TableCell>
                                            <TableCell>{ repo.stars }</TableCell>
                                            <TableCell>{ repo.forks }</TableCell>
                                            <TableCell>{ repo.open_issues }</TableCell>
                                            <TableCell>
                                                <Fragment>
                                                    <IconButton onClick={ () => DeleteRepo(repo.id) }>
                                                        <Delete/>
                                                    </IconButton>
                                                </Fragment>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            )
                        }
                    </Table>
                </TableContainer>
            </Box>
                        
            {/* Modal window */}
            <SimpleModal
                open={ state.open }
                onClose={ ModalClose }
            >
                <Paper sx={ styles.modal } component={ "form" } onSubmit={ SubmitRepo }>
                    <TextField
                        size={ "small" }
                        label={ "name" }
                        name={ "name" }
                        color={ "secondary" }
                        value={ state.name }
                        onChange={ ChangeName }
                        fullWidth
                        required
                    />
                    <Button 
                        type={ "submit" }
                        fullWidth
                        variant={ "contained" }
                    >
                        { "Add" }
                    </Button>
                </Paper>
            </SimpleModal> 
        </Fragment>
    )
}