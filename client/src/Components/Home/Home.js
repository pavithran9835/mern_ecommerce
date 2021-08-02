import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../../Redux/Actions/product.action";
import Slider from "../Slider/Slider";
import Navbar from "../Navbar/Navbar";
import Beatseller from "./Beatseller";
import Newarrival from "./Newarrival";
import { getAllCategory } from "../../Redux/Actions/category.action";
import Gallery from "../Gallery/Gallery";
import Category from "../Category/Category";
import { useHistory } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentImg, setCurrentImg] = useState("");

  const { categorys } = useSelector((state) => state.allCategory);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="HomeContainer">
      <Navbar />
      <Slider />
      <div className="categoryContainer">
        <div className="categoryBox">
          <img src="images/category-1.jpg" alt="category 2" />
        </div>
        <div className="categoryBox">
          <img src="images/category-2.jpg" alt="category 2" />
        </div>
        <div
          className="categoryBox"
          onClick={() => {
            history.push("/category/shirts");
          }}
        >
          <img src="images/category-3.jpg" alt="category 3" />
        </div>
        <div
          className="categoryBox"
          onClick={() => {
            history.push("/category/jeans");
          }}
        >
          <img src="images/category-1.jpg" alt="category 4" />
        </div>
      </div>
      <Newarrival />
      <Beatseller />
      <Category />
    </div>
  );
};

export default Home;
