import React, { useEffect, useState } from "react";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
} from "../../../Redux/Actions/category.action";
import Subcategory from "../Subcategory/Subcategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.allCategory);

  const [updateCategoryName, setUpdateCategoryName] = useState({
    name: "",
  });

  const editCategoryInputHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdateCategoryName((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { category } = useSelector((state) => state.singleCategory);

  useEffect(() => {
    if (category) {
      setUpdateCategoryName(category);
    }
  }, [category]);

  const { message, error } = useSelector((state) => state.createCategory);

  useEffect(() => {
    toast.success(message);
    toast.error(error);
  }, [message, error]);

  const { deleteMessage, deleteError } = useSelector(
    (state) => state.deleteCategory
  );

  useEffect(() => {
    toast.success(deleteMessage);
    toast.error(deleteError);
  }, [deleteMessage, deleteError]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryName));
  };

  const updateFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(updateCategoryName.slug, updateCategoryName.name));
  };

  const { updateMessage, updateError } = useSelector(
    (state) => state.updateCategory
  );

  useEffect(() => {
    toast.success(updateMessage);
    toast.error(updateError);
  }, [updateMessage, updateError]);

  return (
    <>
      <div className="categoryContainer">
        <ToastContainer />
        <div className="categoryRowOne">
          <div className="createCategoryOne">
            <p>create category</p>
            <form className="categoryForm" onSubmit={formSubmitHandler}>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                value={categoryName}
              />

              <button type="submit">submit</button>
            </form>

            <p>edit category</p>
            <form className="categoryForm">
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                onChange={editCategoryInputHandler}
                value={updateCategoryName.name}
              />
              <button type="submit" onClick={updateFormSubmitHandler}>
                update
              </button>
            </form>
          </div>

          <div className="categoryList">
            <table id="categorys">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categorys &&
                  categorys.map((cate) => (
                    <tr key={cate._id}>
                      <td>{cate._id}</td>
                      <td>{cate.name}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          style={{ color: "#1F1F50" }}
                          onClick={() => {
                            dispatch(getSingleCategory(cate.slug));
                          }}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fas fa-trash"
                          style={{ color: "#ff5f5f" }}
                          onClick={() => {
                            dispatch(deleteCategory(cate.slug));
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Subcategory />
    </>
  );
};

export default Category;
