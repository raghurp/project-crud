import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';

import { Menu } from '@material-ui/core';
import { useEffect } from 'react';
import './HomeStyles/styles.css'
import CartOutput from '../Menus/car-output/CartOutput';
import { connect } from 'react-redux';
import CreateCard from './CreateCard';
// import './layoutdesign.css'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
 
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#3c8dbc'
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  profileButton: {
    marginRight: theme.spacing(2),
    marginLeft:'auto',
  },
  hide: {
    display: 'none',
  },
  
  logo: {
    maxWidth: 40,
    marginRight: '10px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  dialogPaper: {
    minHeight: '90vh',
    minWidth: '90vh'
},
table: {
  minWidth: 650,
},

}));

function Topbar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const countArray = useState()
  const [popup, setPopup] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopupClose = () => {
    setPopup(false);
  };

  const handlePopupOpen = () => {
    setPopup(true);
  };
  
  const logout = () => {
    localStorage.clear();
    window.location.reload(false)
  }

  useEffect(() => {
    countArray.push(localStorage.getItem('cart'));
    console.log("Count is " + countArray.length);
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          
          {/* <img className="logo-image" className={classes.logo} src="https://www.freelogodesign.org/file/app/client/thumb/6ecd129a-c59b-42cf-8f75-48bed9618105_200x200.png?1615310346497" /> */}
          <img style={{width:'100%'}} className={classes.logo} src="https://image.shutterstock.com/image-vector/retro-vintage-pizza-logo-typography-600w-1379701046.jpg" />
          <Typography variant="h6" noWrap style={{color:'#081218'}}>
           <p> Pizza Bay </p>
          </Typography>          
          <div className={classes.profileButton} >

          <IconButton color="default" aria-label="add to shopping cart" onClick={handlePopupOpen}>
            <AddShoppingCartIcon  /> 
          <span className='badge badge-warning' id='lblCartCount'> <CartOutput value={props.crt} /> </span>
          </IconButton>          
          
              <IconButton  
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle  />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={opens}
                onClose={handleClose}
              >
              <MenuItem onClick={handleClose}> <a> My profile </a></MenuItem>
              <MenuItem onClick={logout}> <a> Logout </a> </MenuItem>
              </Menu>
            </div>

        </Toolbar>
      </AppBar>

      <div>
      <Dialog 
      classes={{ paper: classes.dialogPaper }}
        open={popup}
        onClose={handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ <center style={{color:'blue'}}> ITEMS IN YOUR CART </center>}</DialogTitle>
        {/* {this.getCrust(x.id)} */}
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {
            (props.pizzaCartItems.length < 1 && props.sidesCartItems.length < 1 &&
              props.beverageCartItems.length < 1)  ? <center>  &#128543; No Items in the cart   </center>: ''}
{/* Style if pizza cart is not empty   */}
          {
            props.pizzaCartItems.length < 1 ? "" :
            <h2 className="heading"> <span> 	&#127829; </span> </h2> 
          }

          {props.pizzaCartItems.map((row) => (
            <p key={row.id} >
            <CreateCard id={row.id} image={row.imgUrl} name={row.name} 
            descrp={row.desc} price={row.price} sizeName={props.sizeNameValue}
            sizePrice={props.sizePriceValue} cart={props.pizzaCartItems}
            conditionValue={"pizza"} sizevalue={row.sizes} />
            </p>
            
          ))}
{/* Style if not sides cart is empty */}
          {
            props.sidesCartItems.length < 1 ? "" :
            <h2 className="heading"> <span> &#127839; </span> </h2> 
          }
            
          {props.sidesCartItems.map((row) => (
            <p key={row.id} >
            <CreateCard id={row.id} image={row.imgUrl} name={row.name} 
            descrp={row.type} price={row.price} cart={props.sidesCartItems}
            conditionValue={"sides"} />
            </p>
          ))}
 {/* Style if not beverage cart is empty */}     

 {
            props.beverageCartItems.length < 1 ? "" :
            <h2 className="heading"> <span> &#129380; </span> </h2> 
          }

          {props.beverageCartItems.map((row) => (
            <p key={row.id} >
            <CreateCard id={row.id} image={row.imgUrl} name={row.name} 
            descrp={row.desc} price={row.price} cart={props.beverageCartItems} 
            conditionValue={"beverage"} />
            </p>
          ))}

          </DialogContentText>
        </DialogContent>
         
        <DialogActions>
          <Button onClick={handlePopupClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
    
  );
  
}

const mapStateToProps = state => {
  return {
      crt: state.cart,
      pizzaCartItems: state.pizzaAdded,
      beverageCartItems: state.beverageAdded,
      sidesCartItems: state.sidesAdded,
      sizeNameValue: state.sizeName,
      sizePriceValue: state.sizePrice

  };
};

export default connect(mapStateToProps, null)(Topbar);