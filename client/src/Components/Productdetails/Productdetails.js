import React, { useEffect, useState } from "react";
import "./Productdetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../Redux/Actions/product.action";
import { getSingleCategory } from "../../Redux/Actions/category.action";
import { getSingleSubCategory } from "../../Redux/Actions/subCategory.action";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import RatingModal from "react-star-ratings";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth, getCookie } from "../../helper";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { setProductsStar } from "../../Redux/Actions/product.action";
import cookie from "js-cookie";
import { Showaverage } from "../Rating/Rating";
import Relatedproducts from "../RelatedProducts/Relatedproducts";
import { getRelatedProducts } from "../../Redux/Actions/product.action";
import _ from "lodash";
import Tooltip from "react-simple-tooltip";
import { ADD_TO_CART } from "../../Redux/Constants/cartConstant";

const Productdetails = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [productDetails, setProductDetails] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [star, setstar] = useState(0);
  const [quantity, setquantity] = useState("1");
  const [relatedProductsState, setrelatedProductsState] = useState([]);
  const [tooltip, settooltip] = useState("Add cart");

  const [wishlist, setwishlist] = useState(false);

  const { loading, singleProduct } = useSelector(
    (state) => state.getSingleProduct
  );

  useEffect(() => {
    if (singleProduct) {
      setProductDetails(singleProduct);
    }
  }, [singleProduct]);

  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
  }, [dispatch]);

  const whishListChangeHandler = () => {
    setwishlist(!wishlist);
    toast.success("Whishlist Added");
  };

  function openModal() {
    if (isAuth()) {
      setIsOpen(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `product-details/${id}` },
      });
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  const submitModal = () => {
    setIsOpen(false);
    toast.success("Thanks for your review");
  };

  const id = match.params.id;
  console.log("id :", id);

  // const onStarClick = (newRating, name) => {
  //   setstar(newRating);
  //   dispatch(setProductsStar(newRating));
  //   console.log(newRating, name);
  // };

  const authToken = getCookie("token");

  useEffect(() => {
    dispatch(getRelatedProducts(id));
  }, [dispatch]);

  const { relatedProducts } = useSelector((state) => state.RelatedProducts);

  useEffect(() => {
    if (relatedProducts) {
      setrelatedProductsState(relatedProducts);
    }
  }, [relatedProducts]);

  const addToCartHandler = () => {
    console.log("add to cart");

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...productDetails,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));

      settooltip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      toast.success("Product Added To Cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="productDetailsContainer">
        <ToastContainer />
        <div className="productImageContainer">
          <Carousel className="carousel">
            {productDetails.images &&
              productDetails.images.map((image) => (
                <div key={image.url}>
                  <img src={image.url} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="productInfoContainer">
          <h1 className="productTitle">{productDetails.title}</h1>
          <div className="category">
            <p>Product Id</p>
            <p className="answerDetail">({productDetails._id})</p>
          </div>
          <div className="productReviewContainer">
            {productDetails &&
            productDetails.ratings &&
            productDetails.ratings.length > 0
              ? Showaverage(productDetails)
              : "NO Ratings Yet"}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              className="modalContainer"
            >
              <div className="topModalContainer">
                <StarRatings
                  name={productDetails._id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={(newRating, name) => {
                    setstar(newRating);
                    dispatch(
                      setProductsStar(productDetails._id, newRating, authToken)
                    );
                    console.log(newRating, name);
                  }}
                  isSelectable={true}
                  starRatedColor="red"
                  className="starRating"
                />
              </div>
              <div className="downModalContainer">
                <button onClick={submitModal}>submit</button>
                <button onClick={closeModal}>cancel</button>
              </div>
            </Modal>

            <button onClick={openModal} className="ratingButton">
              {isAuth() ? "Leave Rating" : "Login To Leave Rating"}
            </button>
          </div>
          <div className="price">
            <p className="productdetailsprice">
              <i class="fas fa-rupee-sign"></i>
              {productDetails.price + 20}
            </p>
            <p className="productdetailspriceOffer">
              <i class="fas fa-rupee-sign"></i>
              {Math.round(productDetails.price - productDetails.price / 10)}
            </p>
          </div>
          <div className="description">
            <p>{productDetails.description}</p>
          </div>
          <div className="color">
            <p>Color</p>
            <div
              className="colorBox"
              style={{ backgroundColor: `${productDetails.color}` }}
            ></div>
          </div>
          <div className="quantity">
            <p>Quantity</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setquantity(e.target.value);
              }}
            />
            <Tooltip
              content={tooltip}
              className="tooltip"
              arrow={15}
              background="#000"
              border="#000"
              color="#fff"
              fadeDuration={0}
              fadeEasing="linear"
              fixed={false}
              fontFamily="inherit"
              fontSize="inherit"
              offset={0}
              padding={8}
              placement="top"
              radius={0}
              zIndex={1}
            >
              <button onClick={addToCartHandler}>Add To Cart</button>
            </Tooltip>
          </div>
          <div className="category" onClick={whishListChangeHandler}>
            {wishlist ? (
              <>
                <i className="fas fa-heart whishlistTrue"></i>
                <p className="answerDetail">Whishlist Added</p>
              </>
            ) : (
              <>
                <i className="far fa-heart"></i>
                <p className="answerDetail">Add to Whishlist</p>
              </>
            )}
          </div>
          <div className="category">
            <i class="fas fa-compress-arrows-alt"></i>
            <p className="answerDetail">Compare</p>
          </div>
          <div className="category">
            <p>Category</p>
            <p className="answerDetail">{productDetails.category}</p>
          </div>
          <div className="category">
            <p>Sub Category</p>
            <p className="answerDetail">{productDetails.subCategory}</p>
          </div>
          <div className="socialmedia">
            <h4>Share</h4>
            <div>
              <i class="fab fa-facebook" style={{ color: "#1773EA" }}></i>
              <i class="fab fa-twitter" style={{ color: "#1C9CEA" }}></i>
              <i class="fab fa-instagram" style={{ color: "#A52EB8" }}></i>
              <i class="fab fa-linkedin" style={{ color: "#1C9CEA" }}></i>
            </div>
          </div>
        </div>
      </div>
      <h1 className="related">Related Products</h1>
      <div className="relatedProductContainer">
        {relatedProductsState.map((relatedProductFiles) => (
          <Relatedproducts
            relatedProductFiles={relatedProductFiles}
            key={relatedProductFiles._id}
          />
        ))}
      </div>
    </>
  );
};

export default Productdetails;
