import React, { useEffect, useState } from "react";
import "./User.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, createUser } from "../../../Redux/Actions/user.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCreate = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const userInputHandler = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { message, error } = useSelector((state) => state.createUser);

  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(userData));
    toast.dark(message);
    toast.error(error);
  };

  return (
    <div className="userCreateComponent">
      <form action="" className="formComponent">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={userData.name}
          onChange={userInputHandler}
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={userData.email}
          onChange={userInputHandler}
        />
        <input
          type="passsword"
          placeholder="Enter Password"
          name="password"
          value={userData.password}
          onChange={userInputHandler}
        />
        <select name="role" id="role" onChange={userInputHandler}>
          <option value="choose">Choose role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" onClick={createUserHandler}>
          Create User
        </button>
      </form>

      <form action="" className="formComponent">
        <input type="text" placeholder="Enter Name" name="name" />
        <input type="email" placeholder="Enter Email" name="name" />
        <input type="passsword" placeholder="Enter Password" name="name" />
        <select name="cars" id="cars">
          <option value="choose">Choose role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};

export default UserCreate;
