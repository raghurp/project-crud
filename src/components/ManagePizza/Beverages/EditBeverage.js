import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Grid,Container, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import { Formik} from "formik";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import '../Styles/style.css'

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
        name: yup
          .string()
          .required("Please enter Beverage name")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          desc: yup
          .string()
          .required("Please enter the description"),

          imgUrl: yup
          .string()
          .required("Please enter the Image Url"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
      });
class EditBeverage extends Component {
    constructor(){
        super();
        this.state = {
          records: [],
          data:  [],
          name:"",
          imgUrl: "",
          desc:"",
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
        axios.get('http://localhost:3333/beverage/'+var3)
        .then( result =>{
          console.log(result.data);
          this.setState({
            data : result.data,
            name:result.data.name,
            imgUrl: result.data.imgUrl,
            desc:result.data.desc,
            price: result.data.price,
        })
        });
      }

      // update = () => {
      //   const  id  = this.state.data.id;
      //   axios.put(`http://localhost:3333/beverage/`+id, {
      //       name: this.state.name,
      //       desc: this.state.desc,
      //       imgUrl: this.state.imgUrl,
      //       price: this.state.price,
    
      //   })
      //     .then(res => {
      //       console.log(res);
      //       console.log(res.data);
      //       notifcation();
      //       setInterval(() => {
      //         {window.location.pathname = "/user/beverage"}
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
        name: this.state.name,
        desc: this.state.desc,
        imgUrl: this.state.imgUrl,
        price: this.state.price
      }}
      validationSchema={schema}
      validateOnBlur 
      onSubmit = {
        values => {
          const  id  = this.state.data.id;
        axios.put(`http://localhost:3333/beverage/`+id, {
          name: values.name,
          desc: values.desc,
          imgUrl: values.imgUrl,
          price: values.price,
  
    
        })
          .then(res => {
            console.log(res);
            console.log(res.data);
            notifcation();
            setInterval(() => {
              {window.location.pathname = "/user/beverage"}
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
        <h1 className="header" >Update Beverage</h1>
        <div style={{paddingLeft:'270px'}}> 
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">   
        <ReactNotification />
        <TextField
          required
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.name}
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
          name="desc"
          label="Desription"
          variant="outlined"
          value={values.desc}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}      
          /> 
          {errors.desc && touched.desc && (
                        <div className="input-feedback errors">{errors.desc}</div>
                      )}<br />

        <TextField
          id="price"
          label="Price"
          type="number"
          name="price"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.price}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}        />
          {errors.price && touched.price && (
                        <div className="input-feedback errors">{errors.price}</div>
                      )}

        <TextField
          id="Img-Url"
          label="Image Url"
          variant="outlined"
          name="imgUrl"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.imgUrl}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}        />
          {errors.imgUrl && touched.imgUrl && (
                        <div className="input-feedback errors">{errors.imgUrl}</div>
                      )}
        <br />
      <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> UPDATE  </Button> &nbsp;
       <Button onClick={ () => { this.setState({ redirect: "/user/beverage" })}}
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

export default withStyles(styles)(EditBeverage);