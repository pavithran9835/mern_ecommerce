import React, { useState } from "react";
import "./CategoryHomeSearch.css";
import { Showaverage } from "../Rating/Rating";
import { useHistory } from "react-router-dom";

const CategoryHomeSearch = ({ search }) => {
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
      className="singleProduct"
      onClick={() => {
        history.push(`/product-details/${search._id}`);
      }}
    >
      <div
        className="singleProductImageContainer"
        onMouseOver={changeImageOverHandler}
        onMouseOut={changeImageOutHandler}
      >
        {changeImage ? (
          <img src={search.images[0].url} alt="" />
        ) : (
          <img src={search.images[1].url} alt="" />
        )}
      </div>
      <div className="singleProductDetails">
        <p>{search.title}</p>
      </div>
      <div className="singleProductPricestar">
        <div className="productPrice">
          <p className="priceOffer">
            <i class="fas fa-rupee-sign"></i>
            {search.price}
          </p>
          <p className="realPrice">
            <i class="fas fa-rupee-sign"></i>
            {Math.round(search.price - search.price / 10)}
          </p>
        </div>
        <div className="productStar">
          {search && search.ratings && search.ratings.length > 0
            ? Showaverage(search)
            : "NO Ratings Yet"}
        </div>
      </div>
    </div>
  );
};

export default CategoryHomeSearch;
