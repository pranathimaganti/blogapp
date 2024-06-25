import './UserProfile.css'
import {NavLink,Outlet} from 'react-router-dom'

function UserProfile() {
  return (
    <>
    <NavLink to='articles' className='fs-2 text-primary nav-link mt-4 text-center'>Articles</NavLink>
    <Outlet/>
    </>
  )
}

export default UserProfile