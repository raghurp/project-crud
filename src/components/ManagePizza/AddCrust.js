import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Container, Grid, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik} from "formik";
import * as yup from "yup";

import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70ch',
          },
        },
        normalTextField: {
           maxHeight : '4px'
        },
      });

    //  Success notification
      function notifcation(){
        store.addNotification({
          title: "Inserted",
          message: "Data has been successfully added",
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
      // Check if any  alphabet present in the textfield
      const checkAlphabet = /^[aA-zZ\s]+$/;
      // Form validation
      const schema = yup.object().shape({ 
        crust_name: yup
          .string()
          .required("Please enter crust name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          crust_desc: yup
          .string()
          .required("Please enter the description"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
      });


class AddCrust extends Component {
    constructor(){
        super();
        this.state = {
          records: [],
          data:  [],
          name:"",
          Description: "",
          price: "",
          fields: {},
          error: false 
        
      };
      }

    render() {
        const { classes } = this.props;
        return (
            <div>
             <div style={{height:60}}  />
             <Formik
      initialValues={{
        crust_name: "",
        crust_desc: "",
        price: ""
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit = {values =>{
        axios.post('/PizzaCrust', {
          name: values.crust_name,
          Description: values.crust_desc,
          price: values.price,
  
      }).then( result =>{
          console.log(result.data);
          this.setState({ records: result.data});
          notifcation(); 
          // Redirect to view page aftr successful addition
          setInterval(() => {
            {window.location.pathname = "/user/pizzacrust"}
          }, 1500);           
        } )
      }}
    >
      {/* Form validation props */}
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
      <Container>
        <h1 className="header" >Add Crust</h1>
        <div style={{paddingLeft:'270px'}}> 
        <ReactNotification />
        <form name="form" onSubmit={handleSubmit} className={classes.root}  autoComplete="off">    
        <TextField
          id="name"
          name="crust_name"
          label="Crust Name"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.crust_name}
          onChange={handleChange}
          onBlur={handleBlur} 
          //onChange={this.OnchangeName}
        />
        {errors.crust_name && touched.crust_name && (
                        <div className="input-feedback errors">{errors.crust_name}</div>
                      )}
        <TextField
          id="Description"
          label="Pizza Description"
          name="crust_desc"
          multiline
          rows={2}
          rowsMax={4}
          variant="outlined" 
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          //onChange={this.OnchangeDesc}
        /> 
        {errors.crust_desc && touched.crust_desc && (
                        <div className="input-feedback errors " >{errors.crust_desc}</div>
                      )}<br />

        <TextField
          id="price"
          label="Price"
          type="number"
          name="price"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          //onChange={this.OnchangePrice}
        />
        {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}
        <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> ADD  </Button> &nbsp;
       <Button  onClick={() => {window.location.pathname = "/user/pizzacrust"}} variant="contained" color="secondary"> CANCEL  </Button>
       </Grid>
    </form>
    </div>
    </Container>
    );
  }}
    </Formik>
            </div>     
                 
        );
    }
}

export default withStyles(styles)(AddCrust);