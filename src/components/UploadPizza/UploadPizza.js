import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import {Checkbox, FormControlLabel, Grid,  Container, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { Formik} from "formik";
import * as yup from "yup";
import './Styles/style.css'

const styles = theme => ({
  root: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '60ch',
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
          .required("Please enter Pizza name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
          
          desc: yup
          .string()
          .required("Please enter desription"),

          imgUrl: yup
          .string()
          .required("Please enter imag Url"),

      
          type: yup
          .string()
          .required("Please select type"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
          
      });

class UploadPizza extends Component {
  constructor(){
    super();
    this.state = {
      name:"",
      desc:"",
      imgUrl:"",
      type:"",
      category:"",
      size_datas: [],
      vegtoppings_datas:  [],
      nonvegtoppings_datas: [],
      records:[],
      sizes:[],
      vegTop:[],
      nonvegTop:[],
      redirect: null    
  };
  }
  componentDidMount() {
    this.getSize();
    this.getVegToppings();
    this.getNonVegToppings();
  }

  getSize = () => {
    axios.get('/PizzaSize')
    .then( result =>{
      this.setState({
        size_datas: result.data,
        });
    });
  }

  getVegToppings = () => {
    axios.get('/vegToppings')
    .then( result =>{
      this.setState({
        vegtoppings_datas: result.data,
        });
    });
  }


  getNonVegToppings = () => {
    axios.get('/nonVegToppings')
    .then( result =>{
      this.setState({
        nonvegtoppings_datas: result.data,
        });
    });
  }

  // handleChange = (e) => {
  //   this.setState({
  //     type: e.target.value
  //   });
  // }

  // OnchangeName = (e) => {
  //   this.setState({
  //     name: e.target.value
  //   });
  // }

  // OnchangeDesc = (e) => {
  //   this.setState({
  //     desc: e.target.value
  //   });
  // }

  // OnchangeUrl = (e) => {
  //   this.setState({
  //     imgUrl: e.target.value
  //   });
  // }

  // OnchangePrice = (e) => {
  //   this.setState({
  //     price: e.target.value
  //   });
  // }

  // OnchangeCategory = (e) => {
  //   this.setState({
  //     category: e.target.value
  //   });
  // }

  post = () => {
    axios.post('/Pizza', {
        name: this.state.name,
        desc: this.state.desc,
        price: this.state.price,
        imgUrl: this.state.imgUrl,
        sizes : this.state.sizes,
        type: this.state.type,
        category: this.state.category


    }).then( result =>{
        console.log(result.data);
        this.setState({ records: result.data});
        notifcation();
        document.getElementById("form").reset();
        setInterval(() => {
          window.location.pathname = "/user/viewcatalog"
        }, 1500);

      } )
}

  size = (e) =>{
   let sizeArray = [...this.state.sizes];
   let index
   if(e.target.checked === true){
    sizeArray.push(e.target.value);
   }else {
    index = sizeArray.indexOf(+e.target.value)
    sizeArray.splice(index, 1)
   }
    this.setState({
      sizes: sizeArray
    })
  }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return (
          <div > 
          <div style={{height:60}}  />
          <Formik
      initialValues={{
        name: "",
        desc: "",
        imgUrl: "",
        type: "",
        category: "",
        price:0
      }}
      validationSchema={schema}
      validateOnBlur
      onSubmit={
        values => {
          axios.post('/Pizza', {
            name: values.name,
            desc: values.desc,
            price: values.price,
            imgUrl: values.imgUrl,
            sizes : this.state.sizes,
            type: values.type,
            category: values.category
    
    
        }).then( result =>{
            console.log(result.data);
            this.setState({ records: result.data});
            notifcation();
            document.getElementById("form").reset();
            setInterval(() => {
              window.location.pathname = "/user/viewcatalog"
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
          handleChange,
          handleBlur,
        } = props;
      
        return(
      <Container>
        <h1 className="header" >Add New Pizza</h1>

        <div style={{paddingLeft:'270px'}}> 
        <ReactNotification />
        <form name="form"  onSubmit={handleSubmit} id="form" className={classes.root}  autoComplete="off">        
        <TextField
          required
          id="name"
          name="name"
          label="Pizza Name"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
                        <div className="input-feedback errors">{errors.name}</div>
                      )}

        <TextField
          id="desc"
          label="Description"
          name="desc"
          variant="outlined" 
          multiline
          rows={2}
          rowsMax={4}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        /> 
        {errors.desc && touched.desc && (
                        <div className="input-feedback errors">{errors.desc}</div>
                      )}
        <br />

        <TextField
          id="Image-Url"
          label="Pizza Image Url"
          variant="outlined" 
          name="imgUrl"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.imgUrl && touched.imgUrl && (
                        <div className="input-feedback errors">{errors.imgUrl}</div>
                      )}

        <TextField
          id="category"
          name="category"
          label="category"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.category && touched.category && (
                        <div className="input-feedback errors">{errors.category}</div>
                      )}
        <br />

      <TextField id="select" label="Type" select 
      
      onChange={handleChange}
      onBlur={handleBlur}
      name="type">
      <MenuItem value="Veg">Veg</MenuItem>
      <MenuItem value="Non-Veg">Non-Veg</MenuItem>
      </TextField>
      {errors.type && touched.type && (
                        <div className="input-feedback errors">{errors.type}</div>
                      )}

      <div style={{paddingLeft:'5px'}}> {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                  )} </div>

        <TextField
          id="price"
          label="Base Price"
          type="number"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        /> 
        
        <br />
        <div />
        <hr />
       <Grid>  
       <FormControl component="fieldset">
          <FormLabel component="legend">Select Sizes of Pizza</FormLabel>
        {this.state.size_datas.map((x) => (          
          <FormControlLabel style={{paddingLeft:5}} key={x.id}
          control = {
          <Checkbox 
          value = {x.id}
          onChange={this.size.bind(this)}
          />
          }
          label={x.size}
          />
        ))}
        </FormControl>
        <hr />
        </Grid>

        <Grid style={{paddingLeft:'10px'}} >
       <Button  type="submit"  variant="contained" color="primary"> ADD  </Button> &nbsp;
       <Button  onClick={ () => { this.setState({ redirect: "/user/viewcatalog" })}} variant="contained" color="secondary"> CANCEL  </Button>
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

export default withStyles(styles)(UploadPizza);