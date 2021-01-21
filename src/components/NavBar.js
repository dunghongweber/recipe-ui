import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper yellow darken-4">
          <a href="/" className="brand-logo center hide-on-small-only">
            My Recipes
          </a>
          <a href="/" className="brand-logo center hide-on-med-and-up">
            Recipes
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/addrecipe">Add Recipe</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
