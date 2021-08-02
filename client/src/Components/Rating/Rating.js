import React from "react";
import StarRating from "react-star-ratings";
import "./Rating.css";

export const Showaverage = (p) => {
  if (p && p.ratings) {
    let ratingArray = p.ratings;
    let total = [];
    let length = ratingArray.length;
    console.log("length : ", length);

    ratingArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => (p + n, 0));
    console.log("totalReduced : ", totalReduced);

    let highest = length * 5;
    console.log("highest : ", highest);

    let starResult = (totalReduced * 5) / highest;
    console.log("starResult : ", starResult);

    return (
      <>
        <StarRating
          starDimension="15px"
          starSpacing="1px"
          rating={starResult}
          starRatedColor="red"
          className="starRatingShow"
        />
        <p className="length"> ({p.ratings.length})</p>
      </>
    );
  }
};
