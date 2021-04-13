import React, {useState} from "react";
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

    const SelectComponent = (props) => {
        const classes = useStyles();
        const [SizeArray, setSizeArray] = useState([]);
        const [size, setSize] = useState('');
        const [sizePrice, setSizePrice] = useState('');

        const handleSizeChange = (e) => {
            setSize(e.target.value);
            //setSizePrice(e.target.value2)
            
            
            props.getSizeName(e.target.value)
            // props.setSizeValue(e.target.value, e.target.value2)
        }

        useEffect(() => {
                props.size.map((val, y) => {
                    axios.get(`http://localhost:3333/PizzaSize/${val}`)
                  .then(res => {
                    const tempArray = SizeArray;
                    tempArray.push(res.data);
                    setSizeArray([...tempArray]);
                  })
                  .catch(err => {
                    console.log(err);
                  })
                })                              
          },
           []);

          const priceUpdate = (price) => {
            props.getSizePrice(price)
           }

    return (
        <div>

    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={size}
          defaultValue="Regular"
          className={classes.selectEmpty}
          onChange={handleSizeChange }
          autoWidth
        >
            {
                SizeArray.map((x, i) => {                   
                    return  <MenuItem key={i} value={x.size}>
                      {x.size} {priceUpdate(x.price)} </MenuItem>  
                    
                })
            }
          
        </Select>
        <FormHelperText>By default Regular is selected</FormHelperText>
      </FormControl>

        </div>
    );
  }

  const mapDispatchToProps = dispatch => {
    return {
        setSizeValue: (name, price) => dispatch( {sizeName: name, sizePrice:price})      
    };
  };

export default connect(null, mapDispatchToProps) (SelectComponent);
