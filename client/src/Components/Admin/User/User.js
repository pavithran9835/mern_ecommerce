import React, { useEffect, useState } from "react";
import "./User.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  getSingleUser,
  createUser,
  updateUser,
} from "../../../Redux/Actions/user.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.getAllUser);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: Boolean,
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

  const checkboxCreateHandler = (e) => {
    const { name, checked } = e.target;

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };

  const { message, error } = useSelector((state) => state.createUser);

  useEffect(() => {
    toast.dark(message);
    toast.error(error);
  }, [message, error]);

  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(userData));
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };

  const { deleteMessage, deleteError } = useSelector(
    (state) => state.deleteUser
  );

  useEffect(() => {
    toast.dark(deleteMessage);
    toast.error(deleteError);
  }, [deleteMessage, deleteError]);

  const { userById } = useSelector((state) => state.getSingleUser);

  // console.log(userById);

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    isAdmin: Boolean,
  });

  useEffect(() => {
    if (userById) {
      setUpdateData(userById[0]);
    }
  }, [userById]);

  const updateDataChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdateData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const checkboxChangeHandler = (e) => {
    const { name, checked } = e.target;

    setUpdateData((prevState) => {
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };

  const updateFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData, updateData._id));
    setUpdateData({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const { updateMessage, updateError } = useSelector(
    (state) => state.updateUser
  );

  useEffect(() => {
    toast.dark(updateMessage);
    toast.error(updateError);
  }, [updateMessage, updateError]);

  return (
    <div className="userComponent">
      <ToastContainer />
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
          <div className="checkbox">
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              onChange={checkboxCreateHandler}
            />
            <label htmlFor="isAdmin">Is Admin</label>
          </div>
          <button type="submit" onClick={createUserHandler}>
            Create User
          </button>
        </form>

        <form className="formComponent">
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={updateData.name}
            onChange={updateDataChangeHandler}
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={updateData.email}
            onChange={updateDataChangeHandler}
          />
          <input
            type="passsword"
            placeholder="Enter Password"
            name="password"
            value={updateData.password}
            onChange={updateDataChangeHandler}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="isAdmin"
              id="adminIs"
              checked={updateData.isAdmin}
              onChange={checkboxChangeHandler}
            />
            <label htmlFor="adminIs">IsAdmin</label>
          </div>

          <button type="submit" onClick={updateFormSubmitHandler}>
            Update User
          </button>
        </form>
      </div>
      <div className="userListComponent">
        <table id="useData">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <i
                    className="fas fa-edit"
                    onClick={() => {
                      dispatch(getSingleUser(user._id));
                    }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fas fa-trash"
                    style={{ color: "red" }}
                    onClick={() => {
                      dispatch(deleteUser(user._id));
                      toast.dark(deleteMessage);
                      toast.error(deleteError);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
