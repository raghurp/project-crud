import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import { Formik} from "formik";
import * as yup from "yup";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function notifcation(){
    store.addNotification({
      title: "Created",
      message: "Account has been successfully created, Try logging in",
      type: "success",
      insert: "top",
      container: "center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  const schema = yup.object().shape({ 
    username: yup
      .string()
      .required("Please enter Username"),
  
      email: yup
      .string()
      .email()
      .required("Please enter Email"),
      
      phone: yup
      .string()
      .required("Please enter Phone number"),
    
      password: yup
      .string()
      .required("Please enter password"),

  });

export default function SignUp() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Formik
    initialValues={{
      username: "",
      phone: "",
      email: "",
      password:""
    }}
    validationSchema={schema}
    validateOnBlur
    onSubmit={
      values => {
      axios.post('http://localhost:8080/users', {
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password

    }).then( result =>{
        console.log(result.data);
        notifcation();
        setInterval(() => {
          {window.location.pathname = "/"}
        }, 1500);
      } ).catch(err => {
        if(err.response.status){
        setErrorMessage("Username or Email already exist")
        }
      })
    }
    }
    >
    
    {(props) => {
        const{
          touched,
          errors,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
        } = props;
      
        return(

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <ReactNotification />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                required
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && (
                        <div className="input-feedback errors ">{errors.username}</div>
                      )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone && (
                        <div className="input-feedback errors ">{errors.phone}</div>
                      )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                        <div className="input-feedback errors ">{errors.email}</div>
                      )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                        <div className="input-feedback errors ">{errors.password}</div>
                      )}
              <p style={{color:'red'}}> {errorMessage} </p>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" onClick={() => { setRedirect("/")}}  variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      );
    }}
    </Formik>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}