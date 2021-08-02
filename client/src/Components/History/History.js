import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./History.css";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrderAction } from "../../Redux/Actions/order.action";
import { getCookie } from "../../helper";
import Orderbox from "./Orderbox";

const History = () => {
  const [myOrderHistory, setMyOrderHistory] = useState([]);

  const dispatch = useDispatch();
  const authToken = getCookie("token");

  useEffect(() => {
    dispatch(getMyOrderAction(authToken));
  }, [dispatch]);

  const { myOrder } = useSelector((state) => state.getMyOrder);

  useEffect(() => {
    if (myOrder) {
      setMyOrderHistory(myOrder);
    }
  }, [myOrder]);

  return (
    <>
      <Navbar />
      <div className="historyPageContainer">
        {myOrderHistory.length > 0 ? (
          myOrderHistory.map((order) => (
            <Orderbox key={order._id} order={order} />
          ))
        ) : (
          <h3>No Order Found</h3>
        )}
      </div>
    </>
  );
};

export default History;
