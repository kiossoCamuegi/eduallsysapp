import { useState, useEffect } from "react";

const RegisterClassForm = ()=>{
    const [values, setValues] = useState({
        title:'',
        code:'',
        classroom: '',
        description:'',
        year:'',
        period:'',
        cicle:'',
        course:''
    });

    const [errors, setErrors] = useState({});

    const handleChange = e =>{
        const {name,value} = e.target;
        setValues({
             ...values,
             [name]:value
        });
    }

    return {handleChange, values} 
}


export default {RegisterClassForm};