import React from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const CartControl = (props) =>  (
        <div className="cartControl" >
            <Button
                      variant="contained"
                      color={props.colour}
                      size="small"
                      onClick={props.clicked}
                      disabled={props.disableVal}                      
                      //disabled = {props.arr.indexOf(props.ids)!==-1 }                      onClick={props.clicked}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      {props.label} {props.button}
                    </Button> 
        </div>
    );


export default CartControl;