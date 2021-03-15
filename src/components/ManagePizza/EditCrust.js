import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Container, Grid, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import { Formik} from "formik";
import * as yup from "yup";
import './Styles/style.css'

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '90ch',
          },
          '& > *': {
            margin: theme.spacing(1),
        },
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        },
        normalTextField: {
          maxHeight : '4px'
       },
      });

      function notifcation(){
        store.addNotification({ 
          title: "Edited",
          message: "Data has been successfully Updated",
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

class EditCrust extends Component {
    constructor(props){
        super(props);
        this.state = {
          records: [],
          data:  [],
          name:"",
          Description: "",
          price: "",
          redirect: null
      };
      }

      componentDidMount() {
        this.get();
        window.scrollTo(0, 0);
    }

    get = () => {
        let var1 = window.location.pathname;
       let var2 = var1.split("");
       let var3 = var2.pop();
        axios.get('http://localhost:3333/PizzaCrust/'+var3)
        .then( result =>{
          console.log(result.data);
          // this.setState({ records: result.data});
          this.setState({
            data : result.data,
            name:result.data.name,
            Description: result.data.Description,
            price: result.data.price,
        })
        });
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
             enableReinitialize
      initialValues={{
        crust_name: this.state.name,
        crust_desc: this.state.Description,
        price: this.state.price
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit={
        values => {
          const  id  = this.state.data.id;
        axios.put(`http://localhost:3333/PizzaCrust/`+id, {
          name: values.crust_name,
          Description: values.crust_desc,
          price: values.price,
    
        })
          .then(res => {
            console.log(res);
            console.log(res.data);
            notifcation();
            setInterval(() => {
              {window.location.pathname = "/user/pizzacrust"}
            }, 1500); 
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
          <Container>
            
        <h1 className="header" >Update Crust</h1>
        <div style={{paddingLeft:'270px'}}>   
        <form onSubmit={handleSubmit} className={classes.root}>
        <ReactNotification />
        <TextField
          
          id="name"
          name="crust_name"
          label="Name"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.crust_name}
          InputLabelProps={{
            shrink: true,
          }}
        /> <br />
        {errors.crust_name && touched.crust_name && (
                        <div className="input-feedback errors">{errors.crust_name}</div>
                      )}
        <TextField
          id="Description"
          label="Description"
          name="crust_desc"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          rows={2}
          rowsMax={4}
          value={values.crust_desc}
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={this.OnchangeDesc}
        />
        <br />
        {errors.crust_desc && touched.crust_desc && (
                        <div className="input-feedback errors">{errors.crust_desc}</div>
                      )} 

        <TextField
          id="price"
          label="Price"
          type="number"
          name="price"
          onChange={handleChange}
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onBlur={handleBlur}
          value={values.price}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <br />
        {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}
       
        <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit" variant="contained" color="primary"> UPDATE  </Button> &nbsp;
       <Button onClick={ () => { this.setState({ redirect: "/user/pizzacrust" })}} 
        variant="contained" color="secondary"> CANCEL  </Button>
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

export default withStyles(styles)(EditCrust);