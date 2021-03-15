import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Menu } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './HomeStyles/styles.css'
// import './layoutdesign.css'
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
}));




export default function Topbar() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const countArray = useState()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          
          <img className="logo-image" className={classes.logo} src="https://www.freelogodesign.org/file/app/client/thumb/6ecd129a-c59b-42cf-8f75-48bed9618105_200x200.png?1615310346497" />
          <Typography variant="h6" noWrap style={{color:'#081218'}}>
           <p> Pizza Bay </p>
          </Typography>          
          <div className={classes.profileButton} >

          <IconButton color="default" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          <span className='badge badge-warning' id='lblCartCount'> {countArray.length } </span>
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
    </div>
  );
  
}