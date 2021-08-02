import React, { useEffect } from "react";
import {
  getAllUsers,
  deleteUser,
  getSingleUser,
} from "../../../Redux/Actions/user.action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.getAllUser);

  const { message, error } = useSelector((state) => state.deleteUser);

  return (
    <div className="userListComponent">
      <ToastContainer />
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
              <td> {user.role}</td>
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
                  onClick={() => {
                    dispatch(deleteUser(user._id));
                    toast.dark(message);
                    toast.error(error);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
