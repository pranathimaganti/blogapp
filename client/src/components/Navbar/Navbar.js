import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../redux/slices/userAuthorSlice';


function Navbar() {
  const { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/Signin');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="https://img.freepik.com/premium-vector/graduation-hat-logo-design-template-inspiration-vector-illustration_556641-1757.jpg" alt="Logo" className="logo-img" />
          </NavLink>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {loginUserStatus === false ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Signup">Signup</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Signin">Signin</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Signin" onClick={signOut}>
                    <span className='fs-5'> Welcome {currentUser?.username}</span> Sign Out
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

