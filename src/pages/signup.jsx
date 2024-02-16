import {Button,Container,Form} from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios'
import '../pages/styles.css'
import {Link} from 'react-router-dom'
function Signup(){
    const API_Url=import.meta.env.VITE_APIURL
   const [formdata,setformdata]=useState({
        name:"",
        email:"",
        password:""
    });
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setformdata({
            ...formdata,
            [name]:value
        })
    }
    const handle=async(e)=>{
        e.preventDefault();
        try{
        const response= await axios.post(`${API_Url}/signin/verify`,formdata);
        console.log(response)
        if(response.data===true){
            alert("Registration link is sent to your email")
           }
           else if(response.data===false){
            alert("user already register try to login")
           }
     }
     catch(e){console.log(e);}
    }

    return(
        <div>
        <Container>
            <h1 className='text-3xl'>Registration</h1>
        <Form onSubmit={handle}> 
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="name" required name="name" value={formdata.name} onChange={handlechange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email"  required name="email" value={formdata.email} onChange={handlechange}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" required value={formdata.password} onChange={handlechange}></Form.Control>
            </Form.Group>

            <Button type="submit"  varient="primary">Register</Button>
           <p className='text-1xl'>Already have a account?   <Link to="/login" className=' text-blue-700 underline'>Login</Link> </p>
        </Form>    
        
        </Container>    
        </div>
    )
}
export default Signup