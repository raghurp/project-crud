import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import{Checkbox, Container, FormControlLabel,Grid, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Formik} from "formik";
import * as yup from "yup";
import './Styles/style.css'

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
        size: yup
          .string()
          .required("Please enter crust name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          serves: yup
          .number()
          .required("Please enter no. of serve")
          .positive('Enter positive numbers only')
          .max(20),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
      });
class AddSize extends Component {
    constructor(){
        super();
        this.state = {
          name : "React",
          records: [],
          data:  [],
          crustAvail: [],
          crust_datas:[],
          size:"",
          serves: "",
          price: "",
        
      };
      }


      componentDidMount() {
        this.getCrust()
      }

      getCrust = () => {
        axios.get('/PizzaCrust')
        .then( result =>{
          this.setState({
            crust_datas: result.data,
            });
        });
      }

    crustSelection = (e) =>{
    let index
    let crustArray = [...this.state.crustAvail];

    if(e.target.checked == true){
      crustArray.push(e.target.value);
     }else {
      index = crustArray.indexOf(+e.target.value)
      crustArray.splice(index, 1)
     }
     this.setState({
      crustAvail: crustArray
     })
   }

    render() {
        const { classes } = this.props;
        return (
            <div>
        <div style={{height:60}}  />
        <Formik
      initialValues={{
        size: "",
        serves: "",
        price: ""
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit={
        values => {
        axios.post('/PizzaSize', {
          size: values.size,
          serves: values.serves,
          price: values.price,
          crustAvail: values.crustAvail
  
      }).then( result =>{
          console.log(result.data);
          this.setState({ records: result.data});
          notifcation();
          setInterval(() => {
            {window.location.pathname = "/user/pizzasize"}
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
        <h1 className="header" >Add Size</h1>

        <div style={{paddingLeft:'270px'}}> 
        <ReactNotification />
        <form name="form" onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">        
        <TextField
          required
          id="size"
          name="size"
          label="Size"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.size && touched.size && (
                        <div className="input-feedback errors ">{errors.size}</div>
                      )}
        <TextField
          id="serves"
          label="Serves"
          name="serves"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          variant="outlined"
          type="number" 
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.serves && touched.serves && (
                        <div className="input-feedback errors ">{errors.serves}</div>
                      )} <br />

        <TextField
          id="price"
          label="Price"
          type="number"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          name="price"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}
        <hr />
        <Grid>  
       <FormControl component="fieldset">
          <FormLabel component="legend">Select Crust of Pizza</FormLabel>
        {this.state.crust_datas.map((x) => (          
          <FormControlLabel style={{paddingLeft:5}} key={x.id}
          name="crustAvail"
          control = {
          <Checkbox 
          value = {x.id}
          onChange={handleChange}
          onBlur={handleBlur}
          />
          }
          label={x.name}
          />
        ))}
        </FormControl>
        <hr />
        </Grid>

      <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> ADD  </Button> &nbsp;
       <Button  onClick={() => {window.location.pathname = "/user/pizzasize"}} variant="contained" color="secondary"> CANCEL  </Button>
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

export default withStyles(styles)(AddSize);