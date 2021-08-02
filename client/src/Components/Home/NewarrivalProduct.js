import React, { useState } from "react";
import Newarrival from "./Newarrival";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../Redux/Actions/product.action";
import { useHistory } from "react-router-dom";
import { Showaverage } from "../Rating/Rating";

const NewarrivalProduct = ({ newArrivals }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [changeImage, setChangeImage] = useState(true);

  const changeImageOverHandler = () => {
    setChangeImage(false);
  };

  const changeImageOutHandler = () => {
    setChangeImage(true);
  };

  return (
    <div
      className="newArrivalProduct"
      onClick={() => {
        history.push(`/product-details/${newArrivals._id}`);
      }}
    >
      <div
        className="singleProductImageContainer"
        onMouseOver={changeImageOverHandler}
        onMouseOut={changeImageOutHandler}
      >
        {changeImage ? (
          <img src={newArrivals.images[0].url} alt="" />
        ) : (
          <img src={newArrivals.images[1].url} alt="" />
        )}
      </div>
      <div className="singleProductDetails">
        <p>{newArrivals.title}</p>
      </div>
      <div className="singleProductPricestar">
        <div className="productPrice">
          <p className="priceOffer">
            <i class="fas fa-rupee-sign"></i>
            {newArrivals.price}
          </p>
          <p className="realPrice">
            <i class="fas fa-rupee-sign"></i>
            {Math.round(newArrivals.price - newArrivals.price / 10)}
          </p>
        </div>
        <div className="productStar">
          {newArrivals && newArrivals.ratings && newArrivals.ratings.length > 0
            ? Showaverage(newArrivals)
            : "NO Ratings Yet"}
        </div>
      </div>
    </div>
  );
};

export default NewarrivalProduct;
