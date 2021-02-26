import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {Grid, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import './styles/view-styles.css';
import axios from 'axios';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css';
import * as yup from "yup";


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

      const schema = yup.object().shape({ 
        emp_id: yup
          .string()
          .required("Please enter your Employee ID"),
    
        emp_name: yup
        .string()
        .required("Please enter your Employee name"),

        emp_dept: yup
        .string()
        .required("Please enter your Employee sdewpartment"),

        emp_age: yup
        .string()
        .required("Please enter your Agew"),

        emp_phone: yup
        .string()
        .required("Please enter your Phonwe"),
        
      });      

      function notifcation(){
        store.addNotification({
          title: "Edited",
          message: "Employee has been successfully Edited",
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
class EditEmployee extends Component  {
  constructor(props){
    super();
    this.state = {
      name : "React",
      records: [],
      employee:  [],
      empId:"",
      empName: "",
      empAge: "",
      phoneNum:"",
      department: "",
  };
  }

  OnchangeID = (e) => {
    this.setState({
      empId : e.target.value
    });
  }

  OnchangeEmpName = (e) => {
    this.setState({
      empName: e.target.value
    });
  }

  OnchangePhone = (e) => {
    this.setState({
      phoneNum: e.target.value
    });
  }

  OnchangeDept = (e) => {
    this.setState({
      department: e.target.value
    });
  }

  OnchangeAge = (e) => {
    this.setState({
      empAge: e.target.value
    });
  }
  
  update = () => {
    const id = this.props.match.params.id;
    axios.put(`http://localhost:3333/employees/`+id, {
      emp_id: this.state.empId,
      name: this.state.empName,
      department: this.state.department,
      phone: this.state.phoneNum,
      age: this.state.empAge

    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        notifcation();
        setInterval(() => {
          {window.location.pathname = "/user/employee"}
        }, 1500);
      })
  }

    render() {
      const id1 = this.props.match.params.id;
        const { classes } = this.props;
        return (
        <div>
        <div style={{height:60}}  />
        <h1 className="header" >Update Employee</h1>
        <div style={{paddingLeft:'270px'}}> 
        <form className={classes.root} noValidate autoComplete="off">    
        <ReactNotification />
        <TextField
          required
          disabled
          id="id"
          label="ID"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          variant="outlined"
          value={id1}
        />

      <TextField
          required
          id="empid"
          label="Emp.ID"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange={this.OnchangeID}
          name = "emp_id"
        /> <br />

        <TextField
          id="name"
          label="Emp Name"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange = {this.OnchangeEmpName}
          name = "emp_name"
        />

        <TextField
          id="phone"
          label="Phone Number"
          type="number"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange = {this.OnchangePhone}
          name = "emp_phone"
        /> <br />

        <TextField
          id="dept"
          label="Department"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange = {this.OnchangeDept}
          name = "emp_dept"
        /> 

        <TextField
          id="age"
          label="Age"
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.normalTextField } }}
          onChange = {this.OnchangeAge}
          name = "emp_age"
        /> 
        <br />
        <Grid style={{paddingLeft:'10px'}} >
       <Button onClick={this.update}  variant="contained" color="primary"> UPDATE  </Button> &nbsp;
       <Button  onClick={() => {window.location.pathname = "/user/employee"}} variant="contained" color="secondary"> CANCEL  </Button>
       </Grid>
    </form>
    </div>
 </div>
        );
    }
}

export default withStyles(styles)(EditEmployee);