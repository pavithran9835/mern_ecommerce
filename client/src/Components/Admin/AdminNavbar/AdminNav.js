import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNav.css";
import { MdDashboard } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

const AdminNav = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const sidebarShowHandler = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarShowHandlertwo = () => {
    setShowSidebar(true);
  };

  return (
    <>
      <div className={showSidebar ? "navigationOpen" : "navigationClose"}>
        <ul className="linkList">
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/dashboard">
              <span className="icon">
                <i className="fas fa-columns"></i>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/products">
              <span>
                <i className="fas fa-tshirt"></i>
              </span>
              <span className="title">Products</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/products/List">
              <span>
                <i className="fas fa-tshirt"></i>
              </span>
              <span className="title">Products List</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/category">
              <span>
                <i className="fas fa-boxes"></i>
              </span>
              <span className="title">Category</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/users">
              <span>
                <i className="fas fa-users"></i>
              </span>
              <span className="title">Users</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="dashboard">
              <span>
                <i className="fas fa-shopping-bag"></i>
              </span>
              <span className="title">Orders</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="dashboard">
              <span>
                <i className="fas fa-chart-bar"></i>
              </span>
              <span className="title">Analytics</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="/admin/coupon">
              <span>
                <i className="fas fa-ticket-alt"></i>
              </span>
              <span className="title">Coupon</span>
            </Link>
          </li>
          <li onClick={sidebarShowHandlertwo}>
            <Link to="dashboard">
              <span>
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className="title">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="toggle">
        <div className="toggleIcon">
          {showSidebar ? (
            <i className="fas fa-bars" onClick={sidebarShowHandler}></i>
          ) : (
            <i className="fas fa-times" onClick={sidebarShowHandler}></i>
          )}
        </div>
        <div className="topNavLeft">
          <h4>
            <i className="fab fa-accusoft"></i> Accusoft
          </h4>
        </div>
        <div className="topNavCenter">
          <input type="text" placeholder="search products..." />
          <i className="fas fa-search"></i>
        </div>

        <div className="topNavRight">
          <h4>
            More <i className="fas fa-chevron-down"></i>
          </h4>
          <h4>
            <i className="fas fa-shopping-bag"></i> Cart ( 0 )
          </h4>
          <h4>
            <i className="fas fa-user-lock"></i> Login
          </h4>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
