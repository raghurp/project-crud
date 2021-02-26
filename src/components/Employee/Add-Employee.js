import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import { Formik} from "formik";
import * as yup from "yup";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
          },
        },
        normalTextField: {
          maxHeight : '4px'
       },
      });

      function notifcation(){
        store.addNotification({
          title: "Inserted",
          message: "Employee has been successfully added",
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

class AddEmployee extends Component {
  constructor(){
    super();
    this.state = {
      records: [],
      errorMessage: ''    
  };
  }
    render() {
        const { classes } = this.props;
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
              console.log(result.status);
              notifcation();
              setInterval(() => {
                {window.location.pathname = "/user/employee"}
              }, 1500);
            }).catch(err => {
              if(err.response.status){
                this.setState({
                  errorMessage:"Username or Email already exist"
                })
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
              <div style={{height:'130px'}} />
              <ReactNotification />
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
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
                  <p style={{color:'red'}}>{this.state.errorMessage}</p>  
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  ADD
                </Button>
              </form>
            </div>
            );
          }}
          </Formik>
          </Container>
        );
    }
}

export default withStyles(styles)(AddEmployee);