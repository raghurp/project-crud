import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from '@material-ui/core/Typography';

    const GroupedButtons = (props) => {
    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
    setCounter(counter + 1);
  };

    const handleDecrement = () => {
    setCounter(counter - 1);
  };
    const displayCounter = counter > 0;

    return (
        <div>
    <Typography variant="subtitle1" style={{color:'#31e05d'}}>₹{(props.price) * counter}</Typography>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement}>+</Button>
        {displayCounter && <Button style={{color:'blue'}} disabled>{counter}</Button>}
        {displayCounter && <Button disabled={(counter < 2)} onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
      </div>
    );
  }


export default GroupedButtons;
