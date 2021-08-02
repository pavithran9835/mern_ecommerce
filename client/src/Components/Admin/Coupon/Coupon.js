import React, { useEffect, useState } from "react";
import "./Coupon.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCookie } from "../../../helper";
import {
  createCoupon,
  listCouponAction,
  deleteCouponAction,
} from "../../../Redux/Actions/coupon.action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Coupon = () => {
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [discount, setdiscount] = useState(0);
  const [expiry, setexpiry] = useState("");
  const [couponData, setcouponData] = useState([]);

  const authToken = getCookie("token");

  // useEffect(() => {
  //   dispatch(createCoupon(name, discount, expiry, authToken));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(listCouponAction(authToken));
  }, [dispatch]);

  const { listCoupon } = useSelector((state) => state.listCoupon);
  const { createCouponMessage, createCouponError } = useSelector(
    (state) => state.createCoupon
  );
  const { deleteCouponMessage, deleteCouponError } = useSelector(
    (state) => state.deleteCoupon
  );

  useEffect(() => {
    if (listCoupon) {
      setcouponData(listCoupon);
    }
  }, [listCoupon]);

  const createCouponHandler = (e) => {
    e.preventDefault();
    dispatch(createCoupon(authToken, name, discount, expiry));
    setdiscount(0);
    setname("");
    setexpiry("");
  };

  useEffect(() => {
    toast.success(createCouponMessage);
    toast.error(createCouponError);
    toast.success(deleteCouponMessage);
    toast.error(deleteCouponError);
  }, [
    createCouponMessage,
    createCouponError,
    deleteCouponMessage,
    deleteCouponError,
  ]);

  return (
    <div className="couponContainer">
      <ToastContainer />
      <div className="createCouponContainer">
        <form>
          <div className="form-group-coupon">
            {/* <label htmlFor="name">Name</label> */}
            <input
              type="text"
              placeholder="coupon name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="form-group-coupon">
            {/* <label htmlFor="name">Discount</label> */}
            <input
              type="number"
              placeholder="discount"
              name="discount"
              value={discount}
              onChange={(e) => {
                setdiscount(e.target.value);
              }}
            />
          </div>
          <div className="form-group-coupon">
            {/* <label htmlFor="name">Expiry</label> */}
            <DatePicker
              selected={new Date()}
              value={expiry}
              onChange={(date) => setexpiry(date)}
              required
              className="datePicker"
            />
          </div>
          <button
            type="button"
            className="couponBtn"
            onClick={createCouponHandler}
          >
            create coupon
          </button>
        </form>
      </div>
      <div className="listCouponContainer">
        <table id="categorys">
          <thead>
            <tr>
              <th>Name</th>
              <th>Discount</th>
              <th>Expiry</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {couponData.map((coupon) => (
              <tr>
                <td>{coupon.name}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.expiry}</td>
                <td>
                  <i
                    className="fas fa-trash"
                    style={{ color: "#ff5f5f" }}
                    onClick={() => {
                      dispatch(deleteCouponAction(authToken, coupon._id));
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

export default Coupon;
