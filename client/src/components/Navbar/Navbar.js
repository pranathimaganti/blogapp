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
    // Remove token from local storage
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/Signin'); 
   };
console.log("Navbar - loginUserStatus:", loginUserStatus);
console.log("Navbar - currentUser:", currentUser);
return (
    <ul className="nav justify-content-end">
      <li> <div className="logo">
          <img src="https://img.freepik.com/premium-vector/graduation-hat-logo-design-template-inspiration-vector-illustration_556641-1757.jpg" alt="Logo" className="logo-img" />
        </div></li>
      {loginUserStatus === false ? (
        <> <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Signup">Signup</NavLink></li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Signin">Signin</NavLink></li>
        </>
      ) : (
        <li className="nav-item">
          <NavLink className="nav-link" to="/Signin" onClick={signOut}>
            <p className='fs-3'> Welcome {currentUser?.username}</p>
            Sign Out</NavLink></li>
      )}
    </ul>
  );
}
export default Navbar;


