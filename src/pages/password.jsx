import React from 'react'
import { Container,Form ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

 const PasswordC = () => {
  const API_Url=import.meta.env.VITE_APIURL
  const [formdata,setFormdata]=useState({
    email:"",
    password:"",
    Repassword:""
  });
  const onchange =(e)=>{
    const {name,value}=e.target;
    setFormdata({...formdata,[name]:value})
  }
  const handle=async (e)=>{
    e.preventDefault();
    console.log(formdata)
    if(formdata.password === formdata.Repassword){
       alert("Email sent to verifying user")
       await axios.post(`${API_Url}/changepass`,formdata)
       
    }
    else{alert("password Didn't match")}
  }
  return (
    <div>
    <Container><h1 className='text-3xl'>Change Password</h1>
        <Form onSubmit={handle}>
        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required name="email" value={formdata.email} onChange={onchange} />
        </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' required name='password'   onChange={onchange} value={formdata.password}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Retype-password:</Form.Label>
                <Form.Control type='password' required name='Repassword'  value={formdata.Repassword} onChange={onchange}/>
            </Form.Group>
            <br></br>
            <Button varient="primary" type="submit">Submit</Button>
            <p>Move to Login page! <Link to="/login" className='text-blue-700 underline'>Login</Link> </p> 
        </Form>
    </Container>
    </div>
  )
}
export default PasswordC