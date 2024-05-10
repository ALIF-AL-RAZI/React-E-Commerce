import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Log In");

  const [formData , setFromData ] = useState({
    username: "",
    password: "",
    email: '',
  })

  const changeHandler = (e)=>{
    setFromData({... formData, [e.target.name]: e.target.value})
  }

  const login = async ()=>{
    console.log("login exe", formData);
    let responseData;
    await fetch ('http://localhost:4000/login',{
      method: "POST",
      headers: {
        Accept: 'application/form-data', 
        "Content-type": 'application/json', 
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors);
    }
  }


  const signup = async ()=>{
    console.log("sign exe", formData) ;

    let responseData;
    await fetch ('http://localhost:4000/signup',{
      method: "POST",
      headers: {
        Accept: 'application/form-data', 
        "Content-type": 'application/json', 
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors);
    }
  }

  


  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign Up"?<input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name'/>:<></>}
          <input type='email' name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address'/>
          <input type='password' name='password' value={formData.password} onChange={changeHandler} placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Log In"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Log In")}}>Login here</span></p>:
                                    <p className='loginsignup-login'>Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id=''/>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup