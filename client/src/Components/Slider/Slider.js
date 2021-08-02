import React, { useState } from "react";
import "./Slider.css";
import { sliderData } from "../helper/Sliderdata";

const Slider = () => {
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className="sliderContainer">
      <div className="carouselContainer">
        <div
          className="carousel-inner"
          style={{ backgroundImage: `url(${sliderData[currentImg].img})` }}
        >
          <div
            className="carousel-inner-left"
            onClick={() => {
              currentImg > 0 && setCurrentImg(currentImg - 1);
            }}
          >
            <i class="fas fa-chevron-left"></i>
            <p className="currentImgNo">0{currentImg}</p>
          </div>
          <div className="carousel-inner-center">
            <h2>Perfect Time To Shop</h2>
            <div className="spacer"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit Sit soluta
              ea atque dolor sit amet consectetur.
            </p>

            <div className="carousel-inner-content-button">
              <button className="carousel-btn1">
                Shop Now <i class="fas fa-arrow-right"></i>
              </button>
              <button className="carousel-btn2">
                View Cart <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div
            className="carousel-inner-right"
            onClick={() => {
              currentImg < sliderData.length - 1 &&
                setCurrentImg(currentImg + 1);
            }}
          >
            <p className="currentImgNo">0{currentImg + 1}</p>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
