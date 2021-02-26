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
import MenuItem from '@material-ui/core/MenuItem';



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

          category: yup
          .string()
          .required("Please enter category")
          .matches(checkAlphabet, 'Numbers not allowed' ),
      
          type: yup
          .string()
          .required("Please select type"),
          
          price: yup
          .number()
          .required("Please enter the price")
          .positive('Enter positive numbers only')
          .max(800)
          
      });

class EditUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            name:'',
            desc:'',
            price:'',
            checkboxData : '',
            category:'',
            imgUrl:'',
            size_datas: [],
            records:[],
            sizes:[],
      };
      }

      componentDidMount() {
        this.get();
        this.getSize();
    }

    sizeSelection(e){
      let index
      let sizeArray = [...this.state.sizes];
  
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

    get = () => {
        let var1 = window.location.pathname;
        let var2 = var1.split("");
        let var3 = var2.pop();
        axios.get('http://localhost:3333/Pizza/'+var3)
        .then( result =>{
          console.log(result.data.crustAvail);
          // this.setState({ records: result.data});
          this.setState({
            data : result.data,
            name: result.data.name,
            desc: result.data.desc,
            imgUrl: result.data.imgUrl,
            price: result.data.price,
            category: result.data.category,
            checkboxData : result.data.sizes,
            sizes : result.data.sizes
        })
        });
      }

      getSize = () => {
        axios.get('/PizzaSize')
        .then( result =>{
          this.setState({
            size_datas: result.data,
            
            });
        });
      }

    render() {
        const { classes } = this.props;
        return (
    <div>
        <div style={{height:60}}  />
        <Formik
        enableReinitialize
        initialValues={{
        name: this.state.name,
        desc: this.state.desc,
        type: this.state.type,
        imgUrl: this.state.imgUrl,
        category: this.state.category,
        price: this.state.price
      }}
      validationSchema={schema}
      validateOnBlur 
      onSubmit = {
        values => {
          const  id  = this.state.data.id;
          axios.put(`http://localhost:3333/Pizza/`+id, {
              name: values.name,
              desc: values.desc,
              type: values.type,
              imgUrl: values.imgUrl,
              category: values.category,
              price: values.price,
              sizes: this.state.sizes
      
          })
            .then(res => {
              console.log(res);
              console.log(res.data);
              notifcation();
              setInterval(() => {
                {window.location.pathname = "/user/viewcatalog"}
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
            
        <h1 className="header" >Update Pizza</h1>
        <div style={{paddingLeft:'270px'}}> 
        <form onSubmit={handleSubmit} className={classes.root}  autoComplete="off">   
        <ReactNotification />
        <TextField
          required
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors.name && touched.name && (
                        <div className="input-feedback errors">{errors.name}</div>
                      )}

        <TextField
          id="desc"
          label="Description"
          variant="outlined"
          name="desc"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.desc}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
        {errors.desc && touched.desc && (
                        <div className="input-feedback errors">{errors.desc}</div>
                      )}<br />

        <TextField
          id="Image-Url"
          label="Pizza Image Url"
          variant="outlined" 
          name="imgUrl"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          value={values.imgUrl}
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
          value={values.category}
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

      <TextField id="select" label="Type" value="20" select 
      required
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{ classes: { input: this.props.classes.normalTextField } }}
      value={values.type}
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
          label="Price"
          type="number"
          name="price"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <br />

        <Grid>  
       <FormControl component="fieldset">
          <FormLabel component="legend">Select Size of Pizza</FormLabel>
        {this.state.size_datas.map((x) => (          
          <FormControlLabel style={{paddingLeft:5}} key={x.id}
          control = {
          <Checkbox 
          value = {x.id}
          defaultChecked = {this.state.checkboxData.includes(JSON.stringify(x.id)) ? true : false}
          onChange={this.sizeSelection.bind(this)}
          />
          }
          label={x.size }
          />
        ))}
        </FormControl>
        <hr />
        </Grid>
        <Grid style={{paddingLeft:'10px'}} >
       <Button type="submit"  variant="contained" color="primary"> UPDATE  </Button> &nbsp;
       <Button  onClick={() => {window.location.pathname = "/user/viewcatalog"}} variant="contained" color="secondary"> CANCEL  </Button>
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

export default withStyles(styles)(EditUpload);