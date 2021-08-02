import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import CartData from "./CartData";
import Navbar from "../Navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import { isAuth, getCookie } from "../../helper";
import { createCart } from "../../Redux/Actions/product.action";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [cartProducts, setcartProducts] = useState([]);

  const { cart } = useSelector((state) => state);

  console.log(JSON.stringify(cart, null, 4));

  useEffect(() => {
    if (cart) {
      setcartProducts(cart);
    }
  }, [cart]);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const authToken = getCookie("token");

  const saveOrderToDb = () => {
    dispatch(createCart(cart, authToken));
    history.push("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="cart_container">
        <div className="cart_details_table">
          {!cartProducts.length ? (
            "No Products in Cart"
          ) : (
            <table id="cartTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Count</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((cartProduct) => (
                  <CartData cartProduct={cartProduct} key={cartProduct._id} />
                  // <h1>{cartProduct._id}</h1>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="cart_order_table">
          {/* <div className="cart_coupon">
            <h3>COUPON</h3>

            <input type="text" placeholder="coupon code" />
            <button>Apply Coupon</button>
          </div> */}
          <div className="cart_total">
            <h3>ORDER SUMMARY</h3>
            <p>Products Details</p>
            <table className="orderTable">
              <tbody>
                {cartProducts.map((product) => (
                  <tr>
                    <td>{product.brand}</td>
                    <td> x </td>
                    <td>{product.count}</td>
                    <td> = </td>
                    <td>{product.count * product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            Total: <b>${getTotal()}</b> <br />
            {isAuth() ? (
              <button
                type="button"
                class="buttonChecout"
                disabled={!cartProducts.length}
                onClick={saveOrderToDb}
              >
                Proceed to Checkout
              </button>
            ) : (
              <button type="button" class="buttonChecout">
                <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                  Login to Checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
