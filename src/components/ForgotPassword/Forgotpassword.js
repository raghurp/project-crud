import React from 'react';
import {Component } from 'react';
import { Formik} from "formik";
import * as yup from "yup";
import './forgotpasswordstyles.css';
import { Button,  Grid, TextField, withStyles,  Container} from '@material-ui/core';

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
});

const schema = yup.object().shape({ 
  newpassword: yup
    .string()
    .required("Please enter your new password"),

    oldpassword: yup
    .string()
    .required("Please enter your Old password"),
    
  confirmpassword: yup
    .string()
    .required("Please confirm your confirm password")
    .notOneOf([yup.ref("oldpassword")],"Old Password and new password cannot be same")
    .when("newpassword", {
      is: newpassword => (newpassword && newpassword.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("newpassword")], "Password doesn't match")
    })
});

class Forgotpassword extends Component {

    constructor() {
        super();
        this.state = {
            store: null,
            password: null,
            new_password: null
        }
    }
    
    submit() {
        const pwdVal = document.getElementById("oldpwd").value;
        const confirmVal = document.getElementById("newpwd").value;
        const val = JSON.parse(window.localStorage.getItem('login'));
// Check whether username and password matches
       let token = "Bearer " + (val.token);
        fetch('http://localhost:3000/users/change-password', {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : token,
                },
                body: JSON.stringify({
                  'password': pwdVal,
                  'new_password' : confirmVal
                })
            }).then((response) => {
                console.log(response);
                const status = response.status;
                if(status == 500 ){
                  alert('Enter your current password correctly');
                } else if(status == 200){
                  alert('Password changede successfully');
                  localStorage.clear();
                  window.location.reload(false)
                }
            })   
    } 
    
    render() {  
    const { classes } = this.props;
    return (
        <div>
      <Formik
      initialValues={{
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit = {() => { this.submit() }}
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
    <Container className={classes.container} maxWidth="xs">
      {/* <form onClick={() => { this.submit() }}> */}
       <form onSubmit={handleSubmit}>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
              <h2>Enter the details to change password</h2>
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  fullWidth  label="Old Password" id="oldpwd" name="oldpassword" size="small" variant="outlined"  
                  value={values.oldpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}                
                />
                 {errors.oldpassword && touched.oldpassword && (
                        <div className="input-feedback">{errors.oldpassword}</div>
                      )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="New Password" id="newpwd"  name="newpassword" size="small"  type="password"  variant="outlined"
                  value={values.newpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                />
                {errors.newpassword && touched.newpassword && (
                        <div className="input-feedback">{errors.newpassword}</div>
                      )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Confirm Password" id="confirmpwd"  name="confirmpassword" size="small"  type="password"  variant="outlined"
                  value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                />
              {errors.confirmpassword && touched.confirmpassword && (
                        <div className="input-feedback">{errors.confirmpassword}</div>
                      )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Submit
            </Button>
            {this.state.response}
          </Grid>
        </Grid>
      </form>
    </Container>
        );
    }}
      </Formik>
 </div>
    );
}
}

export default withStyles(styles)(Forgotpassword);