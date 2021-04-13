import React, {useState} from "react";
import {useForm} from 'react-hook-form';
import Textbox from "../../dynamic-components/controls/textbox";
import DynamicTable from "../../dynamic-components/Grid/DynamicTable";



    const TroubleLogin = () => {
        const {register, handleSubmit, watch, formState: { errors }} = useForm()

        const onSubmit = (data) => {
            console.log(data)
        }
        
    return (
        <div>    
           <form onSubmit={handleSubmit(onSubmit)}>
            <label for="fname"> First name: </label>
            <input {...register("firstName", { required: true, maxLength: 20 })} /> 
            {errors.firstName && <span>This field is required</span>} 
            <br />

            <label for="lname"> Last name: </label>
            <input type="text" id="lname" name="lname" {...register('lname')}  /> 
            
            <br />

            <label for="phone"> Phone </label>
            <input type="number" id="phone" name="phone" {...register('phone')}  /> <br />

            <Textbox {...register("test", { required: true, maxLength: 20 })} label="Name"/> 
            {errors.test && <span>This field is required</span>}
            <Textbox label="Dept"/>
            <input type="submit" />
           </form>

           <DynamicTable sort="true" filter="true" search="true" pagination="false"
           exportExcel="false" pageSize="10"  url='https://jsonplaceholder.typicode.com/posts' />
          
        </div>
    );
  }

export default TroubleLogin;
