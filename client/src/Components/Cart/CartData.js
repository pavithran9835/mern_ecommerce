import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CartData = ({ cartProduct }) => {
  const dispatch = useDispatch();
  // const [cartProductCount, setcartProductCount] = useState(1);

  const cartQuantityChangeHandler = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == cartProduct._id) {
          cart[i].count = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const cartProductDeleteHandler = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === cartProduct._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <>
      <tr>
        <td>{cartProduct.title}</td>
        <td>
          <img src={`${cartProduct.images[0].url}`} alt="" />
        </td>
        <td>{cartProduct.price}</td>
        <td>{cartProduct.brand}</td>
        <td>
          <i
            class="fas fa-circle"
            style={{ color: `${cartProduct.color}`, fontSize: "20px" }}
          ></i>
        </td>
        <td>
          <form>
            <input
              type="number"
              min="1"
              max={cartProduct.quantity - cartProduct.sold}
              value={cartProduct.count}
              onChange={cartQuantityChangeHandler}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          </form>
        </td>
        <td onClick={cartProductDeleteHandler}>
          <i className="fas fa-trash-alt" style={{ color: "red" }}></i>
        </td>
      </tr>
    </>
  );
};

export default CartData;
