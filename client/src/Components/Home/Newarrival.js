import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsList,
  getProductsCount,
} from "../../Redux/Actions/product.action";
import ReactPaginate from "react-paginate";
import NewarrivalProduct from "./NewarrivalProduct";

const Newarrival = () => {
  const dispatch = useDispatch();

  const [newArrival, setnewArrival] = useState([]);
  const [page, setpage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const { productsList } = useSelector((state) => state.getProductList);

  useEffect(() => {
    loadnewArrival();
  }, []);

  const loadnewArrival = () => {
    dispatch(getProductsList("createdAt", "desc", 1));
  };

  useEffect(() => {
    if (productsList) {
      setnewArrival(productsList);
    }
  }, [productsList]);

  useEffect(() => {
    dispatch(getProductsCount());
  }, [dispatch]);

  const { productCount } = useSelector((state) => state.getProductCount);

  useEffect(() => {
    if (productCount) {
      setProductsCount(productCount);
    }
  }, [productCount]);

  const [changeImage, setChangeImage] = useState(true);

  const changeImageOverHandler = () => {
    setChangeImage(false);
  };

  const changeImageOutHandler = () => {
    setChangeImage(true);
  };

  return (
    <div className="newArrivalContainer">
      <div className="newArrivalRow">
        {newArrival.map((newArrivals) => (
          <NewarrivalProduct newArrivals={newArrivals} key={newArrivals._id} />
        ))}
      </div>
    </div>
  );
};

export default Newarrival;
