import React, { useEffect, useState } from "react";
import "./Register.css";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Actions/auth.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Redirect, Link } from "react-router-dom";
import { isAuth } from "../../helper";

const Register = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const userInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
    // history.push("/login");
  };

  const { message, error } = useSelector((state) => state.register);

  useEffect(() => {
    toast.success(message);
    toast.error(error);
  }, [message, error]);

  return (
    <div className="loginContainer">
      <ToastContainer />
      {isAuth() && <Redirect to="/" />}
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
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
        <div className="formRightConatiner">
          <h2>Welcome To Accusoft</h2>

          <div className="socialMedia">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-github"></i>
          </div>

          <form>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={registerData.name}
              onChange={userInputChangeHandler}
            />
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={registerData.email}
              onChange={userInputChangeHandler}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={registerData.password}
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

export default Register;
