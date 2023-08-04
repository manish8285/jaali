import React, { useState } from 'react'
import {Button, Card, CardBody, Container, FormGroup, Input, Label} from 'reactstrap'
import cities from './cities'
import countryCode from './countryCode'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let navigate=useNavigate()
  const [user, setUser] = useState({
    email:"",
    name:"",
    password:"",
    qualification:"",
    city:"",
    countryCode:"",
    mobile:""
  })

  const registerUser=(user)=>{
    return axios.post("http://localhost:8181/signup",user).then(response=>response.data)
  }
  const register=()=>{
    console.log(user)
    
    registerUser(user).then(data=>{
      console.log(data)
      
        toast.success("Signup Successfull")
        navigate("/login")

    }).catch((error)=>{

      console.log("error",error.response.data)
       toast.error(""+error.response.data)
    })
  }



  return (
  <Container className='mt-4 signupContainer'>
    <Card>
      <CardBody>
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
        id="name"
        name="name"
        placeholder="Full Name"
        type="text"
        onChange={(event)=>setUser({...user,"name":event.target.value})}
      value={user.name}
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

<FormGroup>

        <Input
        className='rounded-0'
          id="exampleSelect"
          name="qualification"
          type="select"
          onChange={(event)=>setUser({...user,"qualification":event.target.value})}

        >
          <option selected>
            -----Highest Education Level-----
          </option>
          <option value={"6th to 9th"}>
          6th to 9th
          </option>
          <option value={"10th Class"}>
          10th Class
          </option>
          <option value={"12th Class"}>
          12th Class
          </option>
          <option value={"Graduate Degree/ Diploma"}>
          Graduate Degree/ Diploma
          </option>
          <option value={"Postgraduate Degree"}>
          Postgraduate Degree
          </option>
          <option value={"Working Professional"}>
          Working Professional
          </option>
          
        </Input>
    </FormGroup>
    <FormGroup>
    <Input
        className='rounded-0'
          id="city"
          name="city"
          type="select"
          onChange={(event)=>setUser({...user,"city":event.target.value})}

        >
          <option selected>
            -----Select Your City-----
          </option>
          {
            cities.map((city,index)=>(
              <option key={index}>
                {city.city}
          </option>
            ))
          }
    </Input>
    </FormGroup>
    <FormGroup>
    <Input
        className='rounded-0'
          id="code"
          name="code"
          type="select"
          onChange={(event)=>setUser({...user,"code":event.target.value})}
      value={user.code}
        >

          {
            countryCode.map((country,index)=>(
              <option  key={index}>
                {`${country.name} (${country.dial_code})` }
          </option>
            ))
          }
    </Input>
    </FormGroup>
    <FormGroup className=''>
      <Input
      className='rounded-0'
        id="mobile"
        name="mobile"
        placeholder="Mobile Numbers"
        type="number"
        onChange={(event)=>setUser({...user,"mobile":event.target.value})}
        value={user.mobile}
      />
</FormGroup>
<Button onClick={()=>register()} className='rounded-0 w-100 signupButton' style={{backgroundColor:"#32c5d2"}}>CREATE NEW ACCOUNT</Button>
    
          <p className='mt-1' style={{cursor:"pointer"}} onClick={()=>navigate("/login")}>Back to login</p>

      </CardBody>
    </Card>
  </Container>
  )
}

export default Signup