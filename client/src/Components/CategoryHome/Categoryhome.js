import React, { useEffect, useState } from "react";
import "./Categoryhome.css";
import { getSingleCategory } from "../../Redux/Actions/category.action";
import { useDispatch, useSelector } from "react-redux";
import CategoryHomeSearch from "../CategoryHomeSearch/CategoryHomeSearch";
import Navbar from "../Navbar/Navbar";

const Categoryhome = ({ match }) => {
  const dispatch = useDispatch();

  const [searchCategory, setsearchCategory] = useState([]);

  const slug = match.params.slug;

  useEffect(() => {
    dispatch(getSingleCategory(slug));
  }, [dispatch]);

  const { productCategory } = useSelector((state) => state.singleCategory);

  useEffect(() => {
    if (productCategory) {
      setsearchCategory(productCategory);
    }
  }, [productCategory]);

  return (
    <>
      <Navbar />
      <h5 className="serchCount">
        {searchCategory.length} Products Found In {slug} Category
      </h5>
      <div className="homeCategoryResult">
        {searchCategory.map((search) => (
          <CategoryHomeSearch search={search} />
        ))}
      </div>
    </>
  );
};

export default Categoryhome;
