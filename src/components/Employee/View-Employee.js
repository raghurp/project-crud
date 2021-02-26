import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import './styles/view-styles.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import StyledTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Button ,TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import './add-employee-style.css';
import TablePagination from '@material-ui/core/TablePagination';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
            },
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '22ch',
              },
        },
    table: {
        minWidth: 700,
      },
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
  });

  function notifcation(){
    store.addNotification({
      title: "Deleted",
      message: "Employee has been successfully Deleted",
      type: "danger",
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
  
  axios.defaults.baseURL = 'http://localhost:3333';
class ViewEmployee extends Component {
  constructor(){
    super();
    this.state = {
      records: [],
      record:  [],
      orgtableData: [],
      open: false,
      page: 0,
      rowsPerPage:4,
      currentPage: 1,
      search: "" 
  };
  }
  
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage:(parseInt(event.target.value, 10))
    })
  };
  
  componentDidMount() {
    this.get()
}

  delete = (id, e) => {
    const val = JSON.parse(window.localStorage.getItem('login'));
    axios.delete(`http://localhost:8080/users/${id}`,{
      headers:{
        "Authorization": val.token
      }})
      .then(res => {
        const records = this.state.records.filter(item => item.userId !== id);
        this.setState({records,
        open: false
        });
        notifcation();
      })
  }

  edit(id){
    window.location.pathname = ("/user/editemployee/"+id);
  }

  get = () => {
    const val = JSON.parse(window.localStorage.getItem('login'));
    axios.get('http://localhost:8080/users', {
      headers:{
        "Authorization": val.token
      }
    })
    .then( result =>{
      console.log(result.data)      
      this.setState({ records: result.data,
        orgtableData : result.data,
      })
    });
  }

  onSearch = e => {
    this.setState({ search: e.target.value });
  };
  
    render() {
        const { classes } = this.props;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, 
          this.state.records.length - this.state.page * this.state.rowsPerPage);
        return (
            <div>
                <div style={{height:60}}  />
                    <h1 className="header" >Employee List</h1>

    <Grid style={{paddingLeft:'270px'}}>
    <Button onClick={() => {window.location.pathname = "/user/addemployee"}} 
    variant="contained" color="primary"> Add Employee <AddIcon /> </Button> &nbsp; 

  <div className="searchBox" style={{float:'right'}}>
  <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search by Emp Name or ID"
        onChange={this.onSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
  </div>
    </Grid> 

    <div style={{height:8}}  /> 
    <div style={{paddingLeft:'270px'}}> 
    <ReactNotification />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> <b> Employee ID </b></StyledTableCell>
            <StyledTableCell> <b> Employee Name </b></StyledTableCell>
            <StyledTableCell align="center"> <b>Email </b></StyledTableCell>
            <StyledTableCell align="right"> <center> <b>Actions  </b> </center></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.records.filter((val) => {
            if(this.search == ""){
              return val;
            }else if(val.username.toLowerCase().includes(this.state.search.toLowerCase()) || 
            val.userId.toLowerCase().includes(this.state.search.toLowerCase())  ){
              return val;
            }
          })
          .slice(this.state.page * this.state.rowsPerPage, this.state.page * 
            this.state.rowsPerPage + this.state.rowsPerPage)
          .map((x) => (
            <TableRow key={x.userId}>
              <StyledTableCell className="fonts" align="right"> <p>{x.userId} </p></StyledTableCell>
              <StyledTableCell component="th" scope="row"> <p> {x.username} </p></StyledTableCell>
              <StyledTableCell align="right"> <p> {x.email} </p> </StyledTableCell>

              <StyledTableCell align="right">
              <Button variant="contained" onClick={() => this.edit(x.id)} 
              color="primary"> Update <EditIcon /> </Button> &nbsp;
              <Button variant="contained"  color="secondary" onClick={this.handleClickOpen}>
               Delete <DeleteIcon /> </Button>

               <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanentely Delete this record from the database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => this.delete(x.userId, e)} color="primary">
            OK
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
              </div>
              </StyledTableCell>
            </TableRow>
          ))}
          {
          emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}

        </TableBody>
      </Table>
    </TableContainer>
    <div >
    <TablePagination
      component="div"
      rowsPerPageOptions={[4, 8, 12]}
      count={this.state.orgtableData.length}
      page={this.state.page}
      onChangePage={this.handleChangePage}
      rowsPerPage={this.state.rowsPerPage}
      onChangeRowsPerPage={this.handleChangeRowsPerPage}
    />
    </div>
    </div>
    </div>
        );
    }
}

export default withStyles(styles)(ViewEmployee);