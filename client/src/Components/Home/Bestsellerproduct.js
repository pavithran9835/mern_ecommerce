import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../Redux/Actions/product.action";
import { useHistory } from "react-router-dom";
import { Showaverage } from "../Rating/Rating";

const Bestsellerproduct = ({ seller }) => {
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
        history.push(`/product-details/${seller._id}`);
      }}
    >
      <div
        className="singleProductImageContainer"
        onMouseOver={changeImageOverHandler}
        onMouseOut={changeImageOutHandler}
      >
        {changeImage ? (
          <img src={seller.images[0].url} alt="" />
        ) : (
          <img src={seller.images[1].url} alt="" />
        )}
      </div>
      <div className="singleProductDetails">
        <p>{seller.title}</p>
      </div>
      <div className="singleProductPricestar">
        <div className="productPrice">
          <p className="priceOffer">
            <i class="fas fa-rupee-sign"></i>
            {seller.price}
          </p>
          <p className="realPrice">
            <i class="fas fa-rupee-sign"></i>
            {Math.round(seller.price - seller.price / 10)}
          </p>
        </div>
        <div className="productStar">
          {seller && seller.ratings && seller.ratings.length > 0
            ? Showaverage(seller)
            : "NO Ratings Yet"}
        </div>
      </div>
    </div>
  );
};

export default Bestsellerproduct;
