// src/components/SignIn.js
import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let[err,setErr]=useState('')
  let navigate=useNavigate()
  async function  onSubmit(data){
    //make http post req
    let res;
    if (data.userType === 'user') {
      res = await axios.post('http://localhost:4000/user-api/user', data);
      console.log(res)
    } else if (data.userType === 'author') {
      res = await axios.post('http://localhost:4000/author-api/author', data);
      console.log(res)
    }

    
    if (res.data.message=='user created'|| res.data.message === 'author created'){
       //navigate to login
       navigate('/SignIn')
    }
    else{
      setErr(res.data.message)
    }
  }
  console.log(err)

  return (
    <div className='formele'>
      
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      {err.length!=0 && <p className='text-danger fs-3'>{err}</p> }
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          {...register('username', { required: true })}
        />
        {errors.username && <p>Username is required</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        {errors.password && <p>Password is required</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="user"
            {...register('userType', { required: true })}
            defaultChecked
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="author"
            {...register('userType', { required: true })}
          />
          Author
        </label>
        {errors.userType && <p>User type is required</p>}
      </div>
      <button type="submit">register</button>
    </form>
    </div>
  );
}

export default SignUp;
