import React, { Component } from 'react';
import { Grid, TextField, Button, InputAdornment} from '@material-ui/core';
import { LockRounded, AccountCircle } from "@material-ui/icons"
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {

    // Initializing state values
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            login: false,
            isLogged: false,
            store: null,
            username: null,
            user: null,
            redirect: null
        }
    }
    
    // Store the token to localStorage
    login() {
        
        axios.post('http://localhost:8080/users/login', {
            email: this.state.email,
            password: this.state.password
        }).then( result =>{
            const tokenValue = result.headers['authorization']
            localStorage.setItem('login', JSON.stringify({
                            token: tokenValue
                        }))            
                            axios.get(`http://localhost:8080/users/${result.headers['userid']}`,{
                                headers: {
                                    "Authorization": tokenValue
                                }
                            }).then( response => {
                                console.log(response.data.loginType); 
                                if(response.data.loginType == "Customer"){
                                    localStorage.setItem('customer', JSON.stringify({
                                    userDetails: response.data
                            }))
                            window.location.pathname = "/home/menu" 
                                }
                            else if(response.data.loginType == "Admin"){
                                localStorage.setItem('admin', JSON.stringify({
                                    userDetails: response.data
                            })) 
                            window.location.pathname = "/user/viewcatalog"                        
                            }
                            })       
          }).catch((error) => {
              console.log(error);
              this.setState({ isLogged: true });
          })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div>
                <div >

                    {/* Login Cover image */}
                <Grid container style={ {minHeight:'100vh'}}>
                    <Grid item xs={12} sm={6}>
                        <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
                         style={{width:'130vh', height:'100%', objectFit: 'cover'}} alt="sample"/>
                    </Grid>
                <Grid  container item xs={12} sm={6}  alignItems="center" direction="center" justify="space-evenly" style={{padding: 50}}> 
                    <div/>
                    <div >
                        {/* Logo Image */}
                        <Grid container justify="center">
                            <img src= "https://st2.depositphotos.com/3687485/9049/v/950/depositphotos_90493674-stock-illustration-pizza-flat-icon-logo-template.jpg" width={140} alt="Logo"/>
                        </Grid>
                        { this.state.isLogged ? <h5 style={{color:'red'}} >Please Enter a Valid Password and Email</h5> : " "}
                        <TextField type="email" onChange={(event) => { this.setState({ email: event.target.value }) }}
                        label='EMAIL' required name="email" fullWidth  
                        InputProps={{startAdornment: <InputAdornment position="start"> <AccountCircle /> </InputAdornment>}} /> <br />

                        <div style={{height:20}} />

                        <TextField type="password" onChange={(event) => { this.setState({ password: event.target.value }) }}
                        label='PASSWORD' name="password" placeholder='Enter password' required type='password' fullWidth 
                        InputProps={{startAdornment: <InputAdornment  position="start"> <LockRounded /> </InputAdornment>}} /> <br />

                        <div style={{height:20}} />
                        <Button onClick={() => { this.login() }} type='submit' color='primary' variant="contained"  fullWidth>Sign in</Button>
                    </div>
                    <div style={{height:20}} />
                    <Grid container justify="center" style={{padding:50}} spacing={3}>
                    <Grid item>
                        <Button  color="primary" >Forgot password</Button>
                    </Grid>
                                
                    <Grid item>
                        <Button 
                        onClick= { () => { this.setState({ redirect: "/signup" })}}
                        color="primary" >Signup</Button>
                    </Grid>
                </Grid>
                </Grid>
                </Grid>    
                        </div>
            </div>
        )
    }
}