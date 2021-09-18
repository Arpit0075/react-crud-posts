import React from "react";
import img from "./img/favicon.ico";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="logo-container">
        <img src={img} alt="logo" />
      </div>
      <ul>
        <NavLink exact activeClassName="active-link" className="link" to={"/"}>
          <li>Home</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active-link"
          className="link"
          to={"/about"}
        >
          <li>About</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active-link"
          className="link"
          to={"/posts"}
        >
          <li>Posts</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active-link"
          className="link"
          to={"/create"}
        >
          <li>Create Post</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
