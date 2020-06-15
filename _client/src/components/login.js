import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

import SnackbarContent from "../common/Snackbar/SnackbarContent";
import { AuthenticationService } from '../services/authorization'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Samir Blog
           </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const textFields = [
    { name: "username", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "password" },
];
function SignIn() {
    const { register, handleSubmit, errors } = useForm();
    const [errormessage, setValue] = useState("");
    let history = useHistory();

    const hasError = inputName => !!(errors && errors[inputName]);

    const onSubmit = data => {
        AuthenticationService.login(data)
            .then((result) => {
                if (result.code === 200 && result.data !== null) {
                    const message = <SnackbarContent message={"" + result.message + ""} close color="success" />
                    setValue(message);
                    setTimeout(() => {
                        setValue("");
                        history.push('/admin/dashboard')
                    }, 2000);
                } else {
                    const message = <SnackbarContent message={"" + result.message + ""} close color="danger" />
                    setValue(message);
                    setTimeout(() => {
                        setValue("")
                    }, 2000);
                }
            })
    };
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <Card style={{ padding: "18px", marginTop: "20px" }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                  </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {textFields.map(field => (
                            <TextField
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                autoFocus
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                className={classes.textField}
                                inputRef={register({ required: true })}
                                error={hasError(field.name)}
                                helperText={hasError(field.name) && `${field.label} is mandatory`}
                            />
                        ))}
                        {errormessage}
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                 </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Card>

        </Container>
    );
}
export default SignIn