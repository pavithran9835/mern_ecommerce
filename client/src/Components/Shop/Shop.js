import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Actions/product.action";
import Singleproduct from "./Singleproduct";
import "./Shop.css";
import Beatseller from "../Home/Beatseller";
import Navbar from "../Navbar/Navbar";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { loading, products } = useSelector((state) => state.products);

  return (
    <>
      <Navbar />
      <div className="shopContainer">
        <div className="filterContainer">
          <h1>Filter</h1>
        </div>
        <div className="productsContainer">
          {products.map((product) => (
            <Singleproduct product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
