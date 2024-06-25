import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice';
import { useNavigate } from 'react-router-dom';
import image2 from '../../images/image2.png'; 

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div>
      
    <div className='container'>
      <div className='imageelement'>
      <div className='titleform'>Login to Read latest Articles!</div>
      <div className='info'>Enter your credentials to unlock a world of insighful blogs</div>
      </div>
      <div className='formele'>
        <form className='loginform' onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Login As:
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
          <div>
            <label htmlFor="username">Username:</label>
            <input className='logintext'
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
          
          <button className="signinbutton" type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>

  );
}

export default SignIn;
