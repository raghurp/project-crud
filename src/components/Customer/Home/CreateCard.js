import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      }
}));

const CreateCard = (props) => {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase >
              <img className={classes.img} alt="complex" src={props.image} />
            </ButtonBase>
          </Grid>
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
                <Typography variant="body2" style={{ cursor: 'pointer', color:'red' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{color:'#31e05d'}}>₹{props.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>    
  );
    }

export default CreateCard
