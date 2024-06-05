import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userAuthorLoginThunk(data));
  };

  useEffect(() => {
    if (loginUserStatus === true) {
      if (currentUser.userType === 'user') {
        navigate('/user-profile');
      } else if (currentUser.userType === 'author') {
        navigate('/author-profile');
      }
    }
  }, [loginUserStatus, currentUser, navigate]);

  return (
    <div className='formele'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
