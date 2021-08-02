import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBestSellerList } from "../../Redux/Actions/product.action";
import Bestsellerproduct from "./Bestsellerproduct";

const Beatseller = () => {
  const dispatch = useDispatch();

  const [bestSeller, setBestSeller] = useState([]);

  const { bestSellerRed } = useSelector((state) => state.getBestSeller);

  useEffect(() => {
    loadBestSeller();
  }, []);

  const loadBestSeller = () => {
    dispatch(getBestSellerList("sold", "desc", 6));
  };

  useEffect(() => {
    if (bestSellerRed) {
      setBestSeller(bestSellerRed);
    }
  }, [bestSellerRed]);

  return (
    <div className="newArrivalContainer">
      <div className="newArrivalRow">
        {bestSeller.map((seller) => (
          <Bestsellerproduct seller={seller} key={seller._id} />
        ))}
      </div>
    </div>
  );
};

export default Beatseller;
