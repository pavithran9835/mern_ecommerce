import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  deleteProducts,
  getSingleProduct,
} from "../../../Redux/Actions/product.action";

import "./ProductList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);

  const { message, error } = useSelector((state) => state.deleteProducts);

  useEffect(() => {
    toast.success(message);
    toast.dark(error);
  }, [message, error]);

  return (
    <div className="productContainer">
      <ToastContainer />
      <div className="tableContainer">
        <table id="adminProductTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Images</th>
              <th>Brand</th>
              <th>Rating</th>
              <th>Sold</th>
              <th>Color</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={`${product.images[0].url}`} alt="" />
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.rating}</td>
                  <td>{product.sold}</td>
                  <td>{product.color}</td>
                  <td>
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <i className="far fa-edit" style={{ color: "green" }}></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      style={{ color: "red" }}
                      onClick={() => {
                        dispatch(deleteProducts(product._id));
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

export default ProductList;
