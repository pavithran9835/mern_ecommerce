import React, { useEffect, useState } from "react";
import "./Relatedproducts.css";
import { useSelector, useDispatch } from "react-redux";
import { getRelatedProducts } from "../../Redux/Actions/product.action";
import { useHistory } from "react-router-dom";
import { Showaverage } from "../Rating/Rating";

const Relatedproducts = ({ relatedProductFiles }) => {
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
        history.push(`/product-details/${relatedProductFiles._id}`);
      }}
    >
      <div
        className="singleProductImageContainer"
        onMouseOver={changeImageOverHandler}
        onMouseOut={changeImageOutHandler}
      >
        {changeImage ? (
          <img src={relatedProductFiles.images[0].url} alt="" />
        ) : (
          <img src={relatedProductFiles.images[1].url} alt="" />
        )}
      </div>
      <div className="singleProductDetails">
        <p>{relatedProductFiles.title}</p>
      </div>
      <div className="singleProductPricestar">
        <div className="productPrice">
          <p className="priceOffer">
            <i class="fas fa-rupee-sign"></i>
            {relatedProductFiles.price}
          </p>
          <p className="realPrice">
            <i class="fas fa-rupee-sign"></i>
            {Math.round(
              relatedProductFiles.price - relatedProductFiles.price / 10
            )}
          </p>
        </div>
        <div className="productStar">
          {relatedProductFiles &&
          relatedProductFiles.ratings &&
          relatedProductFiles.ratings.length > 0
            ? Showaverage(relatedProductFiles)
            : "NO Ratings Yet"}
        </div>
      </div>
    </div>
  );
};

export default Relatedproducts;
