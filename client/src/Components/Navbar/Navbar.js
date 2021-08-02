import React, { useState } from "react";
import "./Navbar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { logout } from "../../helper";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../helper";
import jwt from "jsonwebtoken";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const searchQueryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const searchQuerySubmitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/filter/${query}`);
  };

  const { cart } = useSelector((state) => state);

  return (
    <nav className="navbar">
      <div className="navbar_left">
        <img
          src="https://bazaar.qodeinteractive.com/wp-content/uploads/2017/07/logo-dark.png"
          alt="Logo Image"
        />
      </div>
      <div className="navbar_center">
        <input
          type="text"
          placeholder="Search products....."
          name="query"
          autoComplete="off"
          onChange={searchQueryChangeHandler}
        />
        <button type="submit" onClick={searchQuerySubmitHandler}>
          <BiSearchAlt2 />
        </button>
      </div>
      <div className="navbar_right">
        {isAuth() ? (
          <Link to="/profile">
            {isAuth().name}
            {/* <i className="fas fa-chevron-down"></i> */}
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <Link to="/cart">
          Cart <i className="fas fa-shopping-bag"></i> ( {cart.length} )
        </Link>

        {isAuth() && (
          <Link>
            <span
              onClick={() => {
                logout(() => {
                  history.push("/login");
                });
              }}
            >
              Logout
            </span>
          </Link>
        )}

        {/* {!isAuth() && (
          <Link>
            <span
              onClick={() => {
                logout(() => {
                  history.push("/login");
                });
              }}
            >
              Login
            </span>
          </Link>
        )} */}

        {isAuth() && isAuth().isAdmin && (
          <Link to="/admin">
            <span>Admin</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
