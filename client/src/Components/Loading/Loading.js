import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div class="loader">
      <div class="dot">L</div>
      <div class="dot">O</div>
      <div class="dot">A</div>
      <div class="dot">D</div>
      <div class="dot">I</div>
      <div class="dot">N</div>
      <div class="dot">G</div>
      <div class="cogs">
        <div class="cog cog0">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="cog cog1">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="cog cog2">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
