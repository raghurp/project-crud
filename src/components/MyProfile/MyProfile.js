import { Button, Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import './myprofile.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginLeft: 280,
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    }
  });

class MyProfile extends Component {
    
    render() {

        const { classes } = this.props;
        const val = JSON.parse(window.localStorage.getItem('admin'));
        return (
            <div>                
    <div style={{height:70}}  />
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img}  alt="complex" src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 <b>  User Detail </b>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Name : {val.userDetails.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {val.userDetails.userId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Email : {val.userDetails.email}
                </Typography>
              </Grid>

                <Grid item>
                        <Button variant="contained" color="primary" style = {{width: 300}} > 
                        <Link to="/user/edit" style={{ textDecoration: 'none', color:'white'}}>
                        EDIT PROFILE
                        </Link>  </Button>
                </Grid>

                <Grid item>
                        <Button variant="contained" color="secondary" style = {{width: 300}}> 
                        <Link onClick={() => {window.location.pathname = "/user/reset"}}  style={{ textDecoration: 'none', color:'white'}}>
                        CHANGE PASSWORD
                        </Link>
                        </Button>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>

            </div>
        )
    }
}

export default withStyles(styles)(MyProfile);
