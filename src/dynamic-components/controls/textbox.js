import React from "react";
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';



    const Textbox = (props) => {
        const {register, handleSubmit, watch, formState: { errors }} = useForm()

        const onSubmit = (data) => {
            console.log(data)
        }
                
    return (
        <div>    
           <TextField  id="standard-basic" label={props.label} /> <br />
        </div>
    );
  }

export default Textbox;
