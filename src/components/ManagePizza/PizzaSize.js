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
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import './popupstyle.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from '@material-ui/core/TablePagination';
import './Styles/style.css'

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

  // Delete notification
  function notifcation(){
    store.addNotification({
      title: "Deleted",
      message: "Size has been successfully Deleted",
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
class PizzaSize extends Component {
    constructor(){
        super();
        this.state = {
          records: [],
          record:  [],
          crust_datas:[],
          crustArray:[],
          open: false,
          pop: false,
          page: 0,
          rowsPerPage:4,
          search: "",
          redirect: null 
      };
    }

//Delete Dialog box
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

  //Popup dialog box
  handlePopupOpen = () => {
    this.setState({
      pop: true
    })
  };

  handlePopupClose = () => {
    this.setState({
      pop: false
    })
  };

    componentDidMount() {
        this.get()
    }
//Pagination
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
        axios.get('/PizzaSize')
        .then( result =>{
          this.setState({
             records : result.data,
            });
        });
      }

      edit = (id) => {
         this.setState({ redirect: "/user/editsize/"+id })
      }
      
      delete = (id, e) =>{
        axios.delete(`http://localhost:3333/PizzaSize/${id}`)
      .then(res => {
        const records = this.state.records.filter(item => item.id !== id);
        this.setState({records,
          open: false
        });
        notifcation();
      })
      }

      getCrust = (id) => {
        axios.get(`/PizzaSize/${id}`)
        .then( result =>{
          this.setState({
            crustArray:[]
          })
             {result.data.crustAvail.map((x, i) => ( 
              axios.get(`/PizzaCrust/${x}`).then(
                res => {
                 let crust_datas=[...this.state.crustArray]
                  crust_datas.push(res.data.name)
                  this.setState({
                    crustArray: crust_datas,
                    pop: true
                    });
                    console.log(" From First console " + res.data.name)
                }
              )
             ))}
            console.log(" From second console " + result.data.crustAvail)
        });
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
                    <h1 className="header" >Pizza Size</h1>

    <Grid style={{paddingLeft:'270px'}}>
    <Button onClick={ () => { this.setState({ redirect: "/user/addsize" })}}
    variant="contained" color="primary"> Add Size <AddIcon /> </Button> &nbsp; 
    <div className="searchBox" style={{float:'right'}}>
  <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search by Size"
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
            <StyledTableCell align="left"> <b>Size </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Serves </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Price</b></StyledTableCell>
            <StyledTableCell align="left"> <center> <b>Actions  </b> </center> </StyledTableCell>
            
          </TableRow>
        </TableHead>
        
        <TableBody>
          {this.state.records
          .filter((val) => {
            if(this.search == ""){
              return val;
            }else if(val.size.toLowerCase().includes(this.state.search.toLowerCase()) ){
              return val;
            }
          })
          .slice(this.state.page * this.state.rowsPerPage, this.state.page * 
            this.state.rowsPerPage + this.state.rowsPerPage)
          .map((x) => (
            <TableRow key={x.id}>
              <StyledTableCell className="fontsfamily" align="left"> <p> {x.size} </p></StyledTableCell>
              <StyledTableCell className="fontsfamily" align="left"> <p> {x.serves} </p></StyledTableCell>
              <StyledTableCell  className="fontsfamily" align="left"> <p> {x.price} </p></StyledTableCell>

              <StyledTableCell align="center">
              <Button variant="contained" onClick={() => this.edit(x.id)} 
              color="primary"> Update <EditIcon /> </Button> &nbsp;
              <Button variant="contained"  color="secondary" onClick={this.handleClickOpen}> Delete 
              <DeleteIcon /> </Button>    &nbsp;         
              <Button variant="contained" 
              color="primary" onClick={(e) => this.getCrust(x.id, e)}> Crust </Button> &nbsp;

{/* Dialog box for delete button */}
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

      {/* Dialog box for crust list */}

      <div>
      <Dialog
        open={this.state.pop}
        onClose={this.handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Following crust are available for respective size"}</DialogTitle>
        {/* {this.getCrust(x.id)} */}
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.state.crustArray.map((x, i) => ( 
          <ul>
                <li key={i}>{x}</li>
          </ul>
          ))}
          </DialogContentText>
        </DialogContent>
         
        <DialogActions>
          <Button onClick={this.handlePopupClose} color="primary">
            OK
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

export default withStyles(styles)(PizzaSize);