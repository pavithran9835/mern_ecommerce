import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { emptyUserCart, getUserCart } from "../../Redux/Actions/product.action";
import { isAuth, getCookie } from "../../helper";
import Navbar from "../Navbar/Navbar";
import { AiTwotoneAppstore } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { updateUserAddress } from "../../Redux/Actions/user.action";
import { applyCouponAction } from "../../Redux/Actions/coupon.action";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = getCookie("token");

  useEffect(() => {
    dispatch(getUserCart(authToken));
  }, [dispatch]);

  const [userCartproducts, setuserCartproducts] = useState([]);
  const [userCartTotal, setuserCartTotal] = useState(0);
  const [address, setAddress] = useState(" ");
  const [addressSaved, setaddressSaved] = useState(true);
  const [coupon, setCoupon] = useState("");

  const { products, cartTotal, errorUserCart } = useSelector(
    (state) => state.getUserCart
  );

  useEffect(() => {
    if (products) {
      setuserCartproducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (cartTotal) {
      setuserCartTotal(cartTotal);
    }
  }, [cartTotal]);

  const emptyUserCartHandler = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    dispatch(emptyUserCart(authToken));
    setuserCartproducts([]);
    setuserCartTotal(0);
    history.push("/");
  };

  const saveAddressToDb = () => {
    dispatch(updateUserAddress(address, authToken));
    setAddress("");
  };

  const { message, error } = useSelector((state) => state.userAddress);
  const {
    applyCouponMessage,
    applyCouponError,
    totalAfterDiscount,
  } = useSelector((state) => state.applyCoupon);

  useEffect(() => {
    toast.success(message);
    toast.success(applyCouponMessage);
    toast.error(applyCouponError);
  }, [message, error, applyCouponMessage, applyCouponError]);

  const applyCouponCode = (e) => {
    e.preventDefault();
    dispatch(applyCouponAction(authToken, coupon));
    setCoupon("");
  };

  const placeOrderHandler = () => {
    history.push("/payment");
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="checkoutContainer">
        <div className="checkoutContainerLeft">
          <div className="checkoutAddress">
            <ReactQuill
              theme="snow"
              value={address}
              onChange={setAddress}
              className="reactQuill"
              placeholder="Enter Your Address....."
            />
            <button className="adressBtn" onClick={saveAddressToDb}>
              save address
            </button>
          </div>
          <div className="couponcodeform">
            <form className="couponCodeForm">
              <h3>Apply Coupon For discount</h3>
              <input
                type="text"
                placeholder="coupon"
                name="coupon"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
              <button type="button" onClick={applyCouponCode}>
                Apply Coupon
              </button>
            </form>
          </div>
        </div>
        <div className="checkoutContainerRight">
          <h3>Order Summary</h3>

          <p>products : ( {userCartproducts.length} )</p>

          <table className="checkoutOrder">
            <tbody>
              {userCartproducts.map((userCartproduct) => (
                <tr>
                  <td>{userCartproduct.product.title}</td>
                  <td> x </td>
                  <td>{userCartproduct.count}</td>
                  <td> = </td>
                  <td>{userCartproduct.count * userCartproduct.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>
            Total : {totalAfterDiscount ? totalAfterDiscount : userCartTotal}
          </h3>
          <div className="checkoutButton">
            <button type="button" onClick={placeOrderHandler}>
              Place Order
            </button>
            <button type="button" onClick={emptyUserCartHandler}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
