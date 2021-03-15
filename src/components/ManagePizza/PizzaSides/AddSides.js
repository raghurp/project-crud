import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Container, Grid, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik} from "formik";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import '../Styles/style.css'
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
      const checkAlphabet = /^[aA-zZ\s]+$/;
      const schema = yup.object().shape({ 
        name: yup
          .string()
          .required("Please Topping SIde name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          type: yup
          .string()
          .required("Please enter the type")
          .matches(checkAlphabet, 'Numbers not allowed' ),


          imgUrl: yup
          .string()
          .required("Please enter the image url"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(200)
          
      });

class AddSides extends Component {
    constructor(){
        super();
        this.state = {
          records: [],
          data:  [],
          name:"",
          imgUrl: "",
          type:"",
          price: "",
          redirect: null        
      };
      }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div style={{height:60}}  />
                <Formik
      initialValues={{
        name: "",
        type: "",
        imgUrl: "",
        price: ""
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit={
        values =>{
          axios.post('/pizzasides', {
            name: values.name,
            type: values.type,
            imgUrl:values.imgUrl,
            price: values.price,
    
        }).then( result =>{
            console.log(result.data);
            this.setState({ records: result.data});
            notifcation();
            setInterval(() => {
              {window.location.pathname = "/user/pizzasides"}
            }, 1500);
          } )
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
          <Container>
        <h1 className="header" >Add SIdes</h1>
        <div style={{paddingLeft:'270px'}}> 
        <ReactNotification />
        <form name="form" onSubmit={handleSubmit} className={classes.root}  autoComplete="off">        
        <TextField
          required
          id="name"
          label="Toppings Name"
          variant="outlined"
          name="name"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={handleBlur} 
          onChange={handleChange}
        />
        {errors.name && touched.name && (
                        <div className="input-feedback errors">{errors.name}</div>
                      )}
        <TextField
          id="Type"
          label="Type"
          variant="outlined" 
          name="type"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={handleBlur} 
          onChange={handleChange}
        />
        {errors.type && touched.type && (
                        <div className="input-feedback errors">{errors.type}</div>
                      )}
         <br />

        <TextField
          id="Image-Url"
          label="Image Url"
          variant="outlined" 
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          name="imgUrl"
          onBlur={handleBlur} 
          onChange={handleChange}        />
          {errors.imgUrl && touched.imgUrl && (
                        <div className="input-feedback errors">{errors.imgUrl}</div>
                      )}

        <TextField
          id="price"
          label="Price"
          type="number"
          name="price"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onBlur={handleBlur} 
          onChange={handleChange}      
          />
          {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}
        <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> ADD  </Button> &nbsp;
       <Button  onClick={ () => { this.setState({ redirect: "/user/pizzasides" })}} variant="contained" color="secondary"> CANCEL  </Button>
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


export default withStyles(styles)(AddSides);