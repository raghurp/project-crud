import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import GroupedButton from './GroupedButton.js';
import axios from 'axios';
import { useEffect } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        borderBlock:3
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        borderBlockColor: 'red'
      },
      image: {
        width: 128,
        height: 128,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      }
}));

const CreateCard = (props) => {
    const classes = useStyles();

    const removeCart = (id, condition) => {
      props.cart.splice(props.cart.findIndex(function(i){
        return i.id === id;
    }), 1);
    if(condition === "pizza"){
      props.deletePizza(id, props.cart );
    }
    if(condition === "sides"){
      props.deleteSides(id, props.cart);
    }
    if(condition === "beverage"){
      props.deleteBeverage(id, props.cart);
    }
    }  
  
    return (
        <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid border={3} container spacing={2}>
          
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" style={{color:'blue'}}>
                  {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.descrp}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" onClick={() => removeCart(props.id, props.conditionValue)} 
                style={{ cursor: 'pointer', color:'red', width: '3px' }}>
                  Remove
                </Typography>
                
              </Grid>              
            </Grid>
            
            <Grid item>
                <Typography>
                  <GroupedButton price={props.price} />
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        
      </Paper>
      
    </div> 
  );
    }

    const mapDispatchToProps = dispatch => {
      return {
    // Sides
          deleteSides: (id, arrayValue) => dispatch({type: 'REMOVE', value:id, payload:arrayValue }),
    // Pizza
          deletePizza: (id, arrayValue) => dispatch({type: 'DECREMENT', value:id, payload:arrayValue}),
    // Beverage
          deleteBeverage: (id, arrayValue) => dispatch({type: 'DECREASE', value:id, payload:arrayValue}),
      };
    };

export default connect(null, mapDispatchToProps) (CreateCard)
