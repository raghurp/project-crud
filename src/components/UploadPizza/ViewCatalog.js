import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import StyledTableCell from '@material-ui/core/TableCell';
import { TableRow} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactNotification from 'react-notifications-component';
import {store} from "react-notifications-component";
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  function notifcation(){
    store.addNotification({
      title: "Deleted",
      message: "Pizza has been successfully Deleted",
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

class ViewCatalog extends Component {
  constructor(){
    super();
    this.state = {
      records: [],
      page: 0,
      open: false,
      rowsPerPage:4,
      redirect: null
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
  window.scrollTo(0, 0);
}

edit = (id) => {
  this.setState({ redirect: "/user/editpizza/"+id});
}


delete = (id, e) => {
  axios.delete(`http://localhost:3333/Pizza/${id}`)
.then(res => {
  const records = this.state.records.filter(item => item.id !== id);
  this.setState({records,
    open: false});
  notifcation();
})
}

get = () => {
  axios.get('/Pizza')
  .then( result =>{
    this.setState({
      records: result.data
      });
  });
}
    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return (
  <div style={{paddingLeft:'270px'}}> 
  <div style={{height:60}}  />
    
  <h1 style={{color:'#3f51b5'}} >Pizza List</h1>     
  <Button onClick={ () => { this.setState({ redirect: "/user/upload" })}}
            variant="contained" color="primary"> Add Pizza <AddIcon /> </Button> &nbsp;
            <div style={{height:8}}  />
    <TableContainer component={Paper}>
    <ReactNotification />
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left"> <b> Pizza Name</b></StyledTableCell>
            <StyledTableCell align="left"> <b>  Pizza Image </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Price </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Description </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Type </b></StyledTableCell>
            <StyledTableCell align="left"> <b>Category </b></StyledTableCell>
            <StyledTableCell align="center"> <center> <b>Actions  </b> </center></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.records
          .slice(this.state.page * this.state.rowsPerPage, this.state.page * 
            this.state.rowsPerPage + this.state.rowsPerPage)
          .map((x) =>  (
            <TableRow key={x.id}>
              <StyledTableCell component="th" > <p> {x.name} </p></StyledTableCell>
              <StyledTableCell align="left">
              <img style={{height:'90px', width:'90px'}} alt="Pizza" src = {x.imgUrl} />
                </StyledTableCell>
              <StyledTableCell align="left"><p> {x.price} </p></StyledTableCell>
              <StyledTableCell align="left"> <p> {x.desc} </p></StyledTableCell>

              <StyledTableCell align="left">
              <img style={{height:'25px', width:'25px'}} alt="Veg or non-veg" src = {x.type === 'Veg' ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png" :
             "https://tpng.net/download/800x800_245-2459071_veg-biryani-png.png"
            } />
                </StyledTableCell>
              <StyledTableCell align="left"> <p> {x.category} </p></StyledTableCell>
              <StyledTableCell align="left">
              <Button variant="contained" onClick={() => this.edit(x.id)} 
              color="primary"> Update <EditIcon /> </Button>  &nbsp;
              <Button variant="contained" style={{marginTop: '5px'}} color="secondary" onClick={this.handleClickOpen}> Delete 
              <DeleteIcon /> </Button>    &nbsp;
              </StyledTableCell>
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
            </TableRow>
          ))}
          {/* {
          emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        </Table>
        </TableContainer>
        <div>
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

            
        );
    }
}

export default withStyles(styles)(ViewCatalog);