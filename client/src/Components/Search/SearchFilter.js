import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import { useSelector, useDispatch } from "react-redux";
import Singleproduct from "../Shop/Singleproduct";
import { getSearchFilterProducts } from "../../Redux/Actions/product.action";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";
import ReactSlider from "react-slider";

const Searchfilter = ({ match }) => {
  const dispatch = useDispatch();

  const [searchResult, setsearchResult] = useState([]);
  const [value, setvalue] = useState([0, 0]);

  const { loading, searchProducts, priceFilter } = useSelector(
    (state) => state.SearchFilterProducts
  );

  const query = match.params.query;

  console.log("query", query);

  useEffect(() => {
    dispatch(getSearchFilterProducts(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (searchProducts) {
      setsearchResult(searchProducts);
    }
  }, [searchProducts]);

  return (
    <>
      <Navbar />
      <div className="search_container">
        <div className="search_container_left">
          <h2>SEARCH / FILTER</h2>
          <div className="search_box">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              markClassName="example-mark"
              min="0"
              max="1100"
              marks={200}
              defaultValue={[50, 1000]}
              ariaLabel={["Lower thumb", "Middle thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              pearling
              minDistance={10}
              onChange={(val) => {
                setvalue(val);
                dispatch(getSearchFilterProducts(query, value));
              }}
            />
          </div>
        </div>
        <div className="search_container_right">
          {loading ? (
            <Loading />
          ) : (
            searchResult.map((product) => <Singleproduct product={product} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Searchfilter;
