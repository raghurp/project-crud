import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import StyledTableCell from '@material-ui/core/TableCell';
import { Button ,TableRow} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import {withStyles } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component";
import TextField from '@material-ui/core/TextField';
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from '@material-ui/core/TablePagination';

function notifcation(){
  store.addNotification({
    title: "Deleted",
    message: "Data has been successfully Deleted",
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
  });

axios.defaults.baseURL = 'http://localhost:3333';
class VegToppings extends Component {

    constructor(){
        super();
        this.state = {
          records: [],
          record:  [],
          orgtableData: [],
          offset: 0,
          open: false,
          page: 0,
          rowsPerPage:4,
          search: "",
          redirect: null
      };
      this.handlePageClick = this.handlePageClick.bind(this);
    }
    handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;
  
      this.setState({
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.loadMoreData()
      });
  };

  loadMoreData() {
    const data = this.state.orgtableData;
    
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      records:slice
    })
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

    componentDidMount() {
      this.get()
    }

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
  
      get = () => {
          axios.get('/nonVegToppings')
          .then( result =>{
               this.setState({ 
                records : result.data,
                });
          });
          }
  
      edit = (id) => {
        this.setState({ redirect: "/user/editnonvegtoppings/"+id});
      }
  
      delete = (id, e) => {
          axios.delete(`http://localhost:3333/nonVegToppings/${id}`)
        .then(res => {
          const records = this.state.records.filter(item => item.id !== id);
          this.setState({records,
            open: false});
          notifcation();
        })
      }
      onSearch = e => {
        this.setState({ search: e.target.value });
      };

    render() {
        const { classes } = this.props;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, 
        this.state.records.length - this.state.page * this.state.rowsPerPage);
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div style={{height:60}}  />
                    <h1 className="header" >Toppings List</h1>

    <Grid style={{paddingLeft:'270px'}}>
    <Button onClick={ () => { this.setState({ redirect: "/user/addnonvegtoppings" })}}
    variant="contained" color="primary"> Add Toppings <AddIcon /> </Button> &nbsp; 
    <div className="searchBox" style={{float:'right'}}>
  <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search by Topping Name"
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
    <TableContainer component={Paper}>
    <ReactNotification />
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left"> <h4>  Topping Name </h4> </StyledTableCell>
            <StyledTableCell> <b> Topping Image </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Price </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Type </b></StyledTableCell>
            <StyledTableCell align="center"> <center> <b>Actions  </b> </center></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.records
          .filter((val) => {
            if(this.search == ""){
              return val;
            }else if(val.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
            val.type.toLowerCase().includes(this.state.search.toLowerCase()) ){
              return val;
            }
          })
          .slice(this.state.page * this.state.rowsPerPage, this.state.page * 
            this.state.rowsPerPage + this.state.rowsPerPage)
          .map((x) =>  (
            <TableRow key={x.id}>
              <StyledTableCell component="th" scope="row"> <p> {x.name} </p></StyledTableCell>
              <StyledTableCell align="left">
              <img src = {x.imgUrl} />
                </StyledTableCell>
              <StyledTableCell align="left"> <p> {x.price} </p></StyledTableCell>
              <StyledTableCell align="left"> <p> {x.type} </p></StyledTableCell>

              <StyledTableCell align="left">
              <Button variant="contained" onClick={() => this.edit(x.id)} 
              color="primary"> Update <EditIcon /> </Button> &nbsp;
              <Button variant="contained"  color="secondary" onClick={this.handleClickOpen}> Delete 
              <DeleteIcon /> </Button>    &nbsp;

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
          <Button onClick={(e) => this.delete(x.id, e)} color="primary">
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
      count={this.state.records.length}
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

export default withStyles(styles)(VegToppings);