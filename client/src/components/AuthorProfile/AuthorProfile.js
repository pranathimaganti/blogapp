import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./AuthorProfile.css";

function AuthorProfile() {
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);

  return (
    <div className="mt-4">
      <div className="mx-auto">
        <ul className="nav justify-content-around profile">
          <li className="nav-item">
            <NavLink className="nav-link fs-4 fw-semibold" to="new-article" style={{ color: "#16537E" }}>
              Add New Articles
            </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                className="nav-link fs-4 fw-semibold"
                to={`articles-by-author/${currentUser.username}`}
                style={{ color: "#16537E" }}
              >
                Articles
              </NavLink>
          
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
