import React, { useEffect, useState } from "react";
import "./Subcategory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubCategory,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../../Redux/Actions/subCategory.action";
import { getAllCategory } from "../../../Redux/Actions/category.action";

const Subcategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryParentId, setCategoryParentId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSubCategory());
  }, [dispatch]);

  const { loading, subCategorys } = useSelector(
    (state) => state.allSubCategory
  );

  const [updateCategory, setUpdateCategory] = useState({
    name: "",
    parent: "",
  });

  const updateSubInputChangeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdateCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { category } = useSelector((state) => state.singleSubCategory);

  useEffect(() => {
    if (category) {
      setUpdateCategory(category);
    }
  }, [category]);

  const { categorys } = useSelector((state) => state.allCategory);

  let updateSlug = category.slug;

  const categoryData = {
    name: categoryName,
    parent: categoryParentId,
  };

  const { message, error } = useSelector((state) => state.createSubCategory);

  useEffect(() => {
    toast.success(message);
    toast.error(error);
  }, [message, error]);

  const { deleteMessage, deleteError } = useSelector(
    (state) => state.deleteSubCategory
  );

  useEffect(() => {
    toast.success(deleteMessage);
    toast.error(deleteError);
  }, [deleteMessage, deleteError]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(categoryData));
  };

  const { updateMessage, updateError } = useSelector(
    (state) => state.updateSubCategory
  );

  useEffect(() => {
    toast.success(updateMessage);
    toast.error(updateError);
  }, [updateMessage, updateError]);

  const updateFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(updateCategory, updateCategory.slug);
    dispatch(updateSubCategory(updateCategory, updateCategory.slug));
  };

  return (
    <div className="subCategoryContainer">
      <div className="subcategoryRowOne">
        <div className="createCategory">
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>create sub category</p>
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
            <br />

            <select
              name="category"
              id="category"
              onChange={(e) => {
                setCategoryParentId(e.target.value);
              }}
            >
              <option value="choose">Choose Parent Category</option>
              {categorys &&
                categorys.map((catgor) => (
                  <option key={catgor._id} value={catgor._id}>
                    {catgor.name}
                  </option>
                ))}
            </select>

            <button type="submit">submit</button>
          </form>

          <p>edit sub category</p>
          <form className="categoryForm" onSubmit={updateFormSubmitHandler}>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={updateSubInputChangeHandler}
              value={updateCategory.name}
            />
            <select
              name="parent"
              id="parent"
              onChange={updateSubInputChangeHandler}
            >
              <option value="choose">Choose Parent Category</option>
              {categorys &&
                categorys.map((catgor) => (
                  <option key={catgor._id} value={catgor._id}>
                    {catgor.name}
                  </option>
                ))}
            </select>
            <button type="submit">update</button>
          </form>
        </div>

        <div className="subcategoryList">
          <table id="subcategorys">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subCategorys &&
                subCategorys.map((subcate) => (
                  <tr key={subcate._id}>
                    <td>{subcate._id}</td>
                    <td>{subcate.name}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        style={{ color: "#1F1F50" }}
                        onClick={() => {
                          dispatch(getSingleSubCategory(subcate.slug));
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fas fa-trash"
                        style={{ color: "#ff5f5f" }}
                        onClick={() => {
                          dispatch(deleteSubCategory(subcate.slug));
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
  );
};

export default Subcategory;
