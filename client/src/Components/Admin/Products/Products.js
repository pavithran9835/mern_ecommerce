import React, { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { createProducts } from "../../../Redux/Actions/product.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllCategory,
  getChildCategory,
} from "../../../Redux/Actions/category.action";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    title: "",
    price: 0,
    description: "",
    brand: "",
    quantity: 0,
    sold: 0,
    color: "",
    images: [],
    category: {},
    subCategory: {},
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setProductData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const inputCategoryChangeHandler = (e) => {
    const { name, value } = e.target;

    setProductData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    dispatch(getChildCategory(value));
  };

  const { message, error } = useSelector((state) => state.createProducts);

  useEffect(() => {
    toast.success(message);
    toast.error(error);
  }, [message, error]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProducts(productData));
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.allCategory);

  const { childCategory } = useSelector((state) => state.getChildCategory);

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);

    let files = e.target.files;

    let allFileUpload = productData.images;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          500,
          500,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(`http://localhost:5000/cloudinary/upload`, {
                image: uri,
              })
              .then(
                (res) => {
                  console.log("Image Upload Data", res);
                  allFileUpload.push(res.data);
                  setProductData({ ...productData, images: allFileUpload });
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          "base64"
        );
      }
    }
  };

  const removeImageHandler = (public_id) => {
    console.log(public_id);
    axios.post(`http://localhost:5000/cloudinary/remove`, { public_id }).then(
      (res) => {
        console.log("Image remove Data", res);
        const { images } = productData;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setProductData({ ...productData, images: filteredImages });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="productContainer">
      <ToastContainer />

      <div className="formContainer">
        <form>
          <div className="form-group">
            <div className="form-group-left">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Product Title"
                className="leftInput"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Product Price"
                className="rightInput"
                onChange={inputChangeHandler}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-left">
              <label htmlFor="">Category</label>
              <select
                name="category"
                id="category"
                onChange={inputCategoryChangeHandler}
              >
                <option value="choose">Choose Parent Category</option>
                {categorys &&
                  categorys.map((catgor) => (
                    <option key={catgor._id} value={catgor._id}>
                      {catgor.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group-right">
              <label htmlFor="">Sub Category</label>
              {childCategory && (
                <select
                  name="subCategory"
                  id="subCategory"
                  onChange={inputChangeHandler}
                >
                  <option value="choose">Choose Parent Category</option>
                  {childCategory &&
                    childCategory.map((childcatgor) => (
                      <option key={childcatgor._id} value={childcatgor._id}>
                        {childcatgor.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-left">
              <label htmlFor="">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter Product Description"
                className="leftInput"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Product Brand"
                className="rightInput"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-left">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter Product Quantity"
                className="leftInput"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Sold</label>
              <input
                type="number"
                name="sold"
                placeholder="Enter Product Sold"
                className="rightInput"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          {productData.images.length > 0 && (
            <div className="previewContainer">
              {productData.images.map((image) => (
                <div
                  className="previewImage"
                  style={{ backgroundImage: `url("${image.url}")` }}
                  key={image.public_id}
                >
                  <i
                    className="far fa-times-circle"
                    onClick={() => removeImageHandler(image.public_id)}
                  ></i>
                </div>
              ))}
            </div>
          )}
          <div className="form-group">
            <div className="form-group-left">
              <label htmlFor="">Images</label>
              <input
                type="file"
                multiple
                name="images"
                placeholder="Enter Product Images"
                className="leftInput"
                accept="images/*"
                onChange={fileUploadAndResize}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Color</label>
              <input
                type="color"
                name="color"
                id="colorInput"
                placeholder="Color"
                className="Enter Product rightInput"
                onChange={inputChangeHandler}
              />
            </div>
          </div>

          <button type="submit" onClick={formSubmitHandler}>
            submit
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Products;
