import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, FormGroup, Input } from 'reactstrap'

const Login = () => {
  let navigate = useNavigate()
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const logIn=()=>{
    return axios.post("http://localhost:8181/login",user).then(response=>response.data)
  }

  const signIn=()=>{
    console.log(user)
    logIn().then(data=>{
      toast.success("Login Successfull")
      localStorage.setItem("user",JSON.stringify(data))
      //console.log(data)
      navigate("/dashboard")

    }).catch(error=>{
      console.log(error)
      toast.error("Crediential does not match")
      //console.log("Crediential does not match")
    })
  }



  return (
    <Container className='mt-4 signupContainer'>
    <Card>
      <CardBody>
        <h1>Sign In!</h1>
      <FormGroup className=''>

    <Input
    className='rounded-0'
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
      onChange={(event)=>setUser({...user,"email":event.target.value})}
      value={user.email}
    />
  </FormGroup>



<FormGroup className=''>
      <Input
      className='rounded-0'
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={(event)=>setUser({...user,"password":event.target.value})}
      value={user.password}
      />
</FormGroup>








<Button onClick={()=>signIn()} className='rounded-0 w-100 signupButton' style={{backgroundColor:"#32c5d2"}}>Sign In</Button>
    
    <div className='mt-2 mb-2'>
      Don't have an account ? {" "}
      <Button onClick={()=>navigate("/signup")} className='rounded-0 float-right secondSignup'>Sign Up</Button>
    </div>


      </CardBody>
    </Card>
  </Container>
  )
}

export default Login