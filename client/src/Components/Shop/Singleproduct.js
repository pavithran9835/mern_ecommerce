import React, { useState } from "react";
import { Showaverage } from "../Rating/Rating";
import { useHistory } from "react-router-dom";

const Singleproduct = ({ product }) => {
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
        history.push(`/product-details/${product._id}`);
      }}
    >
      <div
        className="singleProductImageContainer"
        onMouseOver={changeImageOverHandler}
        onMouseOut={changeImageOutHandler}
      >
        {changeImage ? (
          <img src={product.images[0].url} alt="" />
        ) : (
          <img src={product.images[1].url} alt="" />
        )}
      </div>
      <div className="singleProductDetails">
        <p>{product.title}</p>
      </div>
      <div className="singleProductPricestar">
        <div className="productPrice">
          <p className="priceOffer">
            <i class="fas fa-rupee-sign"></i>
            {product.price}
          </p>
          <p className="realPrice">
            <i class="fas fa-rupee-sign"></i>
            {Math.round(product.price - product.price / 10)}
          </p>
        </div>
        <div className="productStar">
          {product && product.ratings && product.ratings.length > 0
            ? Showaverage(product)
            : "NO Ratings Yet"}
        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
