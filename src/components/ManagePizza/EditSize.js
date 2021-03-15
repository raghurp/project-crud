import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Grid, Container, Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import { Formik} from "formik";
import * as yup from "yup";
import './Styles/style.css'
import { Button } from '@material-ui/core';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Redirect } from "react-router-dom";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
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
        size: yup
          .string()
          .required("Please enter crust name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          serves: yup
          .string()
          .required("Please enter the description"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
      });

class EditSize extends Component {
    constructor(props){
        super(props);
        this.state = {
          records: [],
          data:  [],
          size:"",
          serves: "",
          price: "",
          crustAvail:[],
          crust_datas:[],
          checkboxData:[],
          redirect: null
      };
      }

      componentDidMount() {
        this.get();
        this.getCrust();
        window.scrollTo(0, 0);
    }

    crustSelection(e){
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

    get = () => {
        let var1 = window.location.pathname;
       let var2 = var1.split("");
       let var3 = var2.pop();
        axios.get('http://localhost:3333/PizzaSize/'+var3)
        .then( result =>{
          console.log(result.data.crustAvail);
          // this.setState({ records: result.data});
          this.setState({
            data : result.data,
            size: result.data.size,
            serves: result.data.serves,
            price: result.data.price,
            checkboxData : result.data.crustAvail,
            crustAvail : result.data.crustAvail
        })
        });
      }

      getCrust = () => {
        axios.get('/PizzaCrust')
        .then( result =>{
          this.setState({
            crust_datas: result.data,
            
            });
        });
      }

      // update = () => {
      //   const  id  = this.state.data.id;
      //   axios.put(`http://localhost:3333/PizzaSize/`+id, {
      //       size: this.state.size,
      //       serves: this.state.serves,
      //       price: this.state.price,
      //       crustAvail: this.state.crustAvail
    
      //   })
      //     .then(res => {
      //       console.log(res);
      //       console.log(res.data);
      //       notifcation();
      //       setInterval(() => {
      //         {window.location.pathname = "/user/pizzasize"}
      //       }, 1500);
      //     })
      // }
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
        size: this.state.size,
        serves: this.state.serves,
        price: this.state.price
      }}
      validationSchema={schema}
      validateOnBlur 
      onSubmit = {
        values => {
          const  id  = this.state.data.id;
          axios.put(`http://localhost:3333/PizzaSize/`+id, {
              size: values.size,
              serves: values.serves,
              price: values.price,
              crustAvail: this.state.crustAvail
      
          })
            .then(res => {
              console.log(res);
              console.log(res.data);
              notifcation();
              setInterval(() => {
                {window.location.pathname = "/user/pizzasize"}
              }, 1500);
            })
        }
      }>
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
            
        <h1 className="header" >Update Size</h1>
        <div style={{paddingLeft:'270px'}}> 
        <form onSubmit={handleSubmit} className={classes.root}  autoComplete="off">   
        <ReactNotification />
        <TextField
          required
          id="size"
          label="Size"
          variant="outlined"
          name="size"
          onChange={handleChange}
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onBlur={handleBlur}
          value={values.size}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors.size && touched.size && (
                        <div className="input-feedback errors">{errors.size}</div>
                      )}
        <TextField
          id="serves"
          label="Serves"
          variant="outlined"
          name="serves"
          type="number" 
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.serves}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
        {errors.serves && touched.serves && (
                        <div className="input-feedback errors">{errors.serves}</div>
                      )}<br />

        <TextField
          id="price"
          label="Price"
          type="number"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.price}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}
        <br />
        <Grid>  
       <FormControl component="fieldset">
          <FormLabel component="legend">Select Crust of Pizza</FormLabel>
        {this.state.crust_datas.map((x) => (          
          <FormControlLabel style={{paddingLeft:5}} key={x.id}
          control = {
          <Checkbox 
          value = {x.id}
          defaultChecked = {this.state.checkboxData.includes(JSON.stringify(x.id)) ? true : false}
          onChange={this.crustSelection.bind(this)}
          />
          }
          label={x.name }
          />
        ))}
        </FormControl>
        <hr />
        </Grid>
        <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> UPDATE  </Button> &nbsp;
       <Button onClick={ () => { this.setState({ redirect: "/user/pizzasize" })}} 
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

export default withStyles(styles)(EditSize);