import React, { useEffect, useState } from "react";
import "./Editproducts.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllCategory,
  getChildCategory,
} from "../../../Redux/Actions/category.action";
import {
  getSingleProduct,
  updateProduct,
} from "../../../Redux/Actions/product.action";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useHistory } from "react-router-dom";

const Editproducts = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
  }, [dispatch]);

  const { singleProduct } = useSelector((state) => state.getSingleProduct);

  const [updateProductData, setUpdateProductData] = useState({
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

  useEffect(() => {
    if (singleProduct) {
      setUpdateProductData(singleProduct);
    }
  }, [singleProduct]);

  const updateInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdateProductData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const inputCategoryChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdateProductData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    dispatch(getChildCategory(value));
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.allCategory);

  const { childCategory } = useSelector((state) => state.getChildCategory);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;

    let allFileUpload = updateProductData.images;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          700,
          700,
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
                  setUpdateProductData({
                    ...updateProductData,
                    images: allFileUpload,
                  });
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
        const { images } = updateProductData;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setUpdateProductData({ ...updateProductData, images: filteredImages });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const { message, error } = useSelector((state) => state.updateProduct);

  useEffect(() => {
    toast.success(message);
    toast.error(error);
  }, [message, error]);

  const updateFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(updateProductData, updateProductData._id));
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
                value={updateProductData.title}
                onChange={updateInputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Product Price"
                className="rightInput"
                value={updateProductData.price}
                onChange={updateInputChangeHandler}
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
                <option value="choose">Choose Category</option>
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
                  onChange={updateInputChangeHandler}
                >
                  <option value="choose">Choose Sub Category</option>
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
                value={updateProductData.description}
                onChange={updateInputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Product Brand"
                className="rightInput"
                value={updateProductData.brand}
                onChange={updateInputChangeHandler}
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
                value={updateProductData.quantity}
                onChange={updateInputChangeHandler}
              />
            </div>
            <div className="form-group-right">
              <label htmlFor="">Sold</label>
              <input
                type="number"
                name="sold"
                placeholder="Enter Product Sold"
                className="rightInput"
                value={updateProductData.sold}
                onChange={updateInputChangeHandler}
              />
            </div>
          </div>
          {updateProductData.images.length > 0 && (
            <div className="previewContainer">
              {updateProductData.images.map((image) => (
                <div
                  className="previewImage"
                  style={{
                    backgroundImage: `url("${image.url}")`,
                  }}
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
                value={updateProductData.color}
                onChange={updateInputChangeHandler}
              />
            </div>
          </div>
          <button type="submit" onClick={updateFormSubmitHandler}>
            update products
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Editproducts;
