import React, { useEffect, useState } from "react";
import "./Login.css";
import { loginUser } from "../../Redux/Actions/auth.action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate, isAuth } from "../../helper";
import { useHistory, Redirect, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const userInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginFormHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/login", {
        email: userData.email,
        password: userData.password,
      })
      .then((response) => {
        authenticate(response, () => {
          setUserData({ email: "", password: "", buttonText: "submit" });

          let intended = history.location.state;
          console.log("intended :", intended);
          if (intended) {
            history.push(intended.from);
          } else {
            isAuth() && isAuth().isAdmin
              ? history.push("/admin")
              : history.push("/");
          }
        });
      })
      .catch((error) => {
        console.log(error.response);
        // setUserData({ ...formData, buttonText: "submit" });
        toast.error(error.response.data.error);
      });
  };

  let intended = history.location.state;
  console.log("intended :", intended);

  return (
    <div className="loginContainer">
      <ToastContainer />

      <div className="formConatiner">
        <div className="formLeftConatiner">
          <div className="formLeftWelcome">
            <h2>Welcome To Accusoft</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              quo eius nulla harum laboriosam quis a recusandae cupiditate
              option.
            </p>
            <button type="submit" className="registerMove">
              <Link to="/register">Create Account</Link>
            </button>
          </div>
        </div>
        <div className="formRightConatiner">
          <h2>SignIn To Accusoft</h2>

          <div className="socialMedia">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-github"></i>
          </div>

          <form>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={userData.email}
              onChange={userInputChangeHandler}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={userInputChangeHandler}
            />
            <button type="submit" onClick={loginFormHandler}>
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
