import React, { useState } from "react";
import RestaurantCards from "./RestaurantCards";
import { useDispatch } from "react-redux";
import { setFilterVal } from "../redux/filterSlice";

function OnlineFoodDelivery({ data = [], title }) {
  const filterOptions = [
    "Ratings 4.0+",
    "Offers",
    "Rs. 300-Rs. 600",
    "Less than Rs. 300",
  ];

  const [activeBtn, setActiveBtn] = useState(null);

  function handleActiveBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  }

  const dispatch = useDispatch();
  dispatch(setFilterVal(activeBtn));

  return (
    <div className="  mt-10 ">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <div className="my-7 flex flex-wrap gap-4">
        {filterOptions.map((filterName, i) => (
          <button
            key={i}
            onClick={() => handleActiveBtn(filterName)}
            className={
              "px-4 py-1 flex gap-1 rounded-full   border border-slate-300 shadow-md " +
              (activeBtn === filterName ? " active" : "")
            }
          >
            <p>{filterName}</p>
            <i className="fi fi-sr-cross-small  text-lg hidden "></i>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-4">
        <RestaurantCards data={data} />
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
