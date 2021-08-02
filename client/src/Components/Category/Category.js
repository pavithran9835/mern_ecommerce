import React, { useEffect, useState } from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../Redux/Actions/category.action";
import { useSelector, useDispatch } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();

  const [allCategory, setallCategory] = useState([]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.allCategory);

  useEffect(() => {
    if (categorys) {
      setallCategory(categorys);
    }
  }, [categorys]);

  return (
    <div className="homeCategoryContainer">
      {allCategory.map((category) => (
        <button type="button" className="homeCategoryButton">
          <Link to={`/category/${category.name}`}>{category.name}</Link>
        </button>
      ))}
    </div>
  );
};

export default Category;
