import React from "react";
import { Link } from "react-router-dom";

function SearchRestaurant({
  data: {
    card: {
      card: { info },
    },
  },
}) {
  const {
    name,
    id: resId,
    avgRating,
    cloudinaryImageId: imageId,
    costForTwoMessage,
    cuisines,
    sla: { slaString },
  } = info;
  return (
    <Link to={`/restaurantmenu/${resId}`}>
      <div className="bg-white pt-4  pb-7 px-3 flex items-center gap-[5%]">
        <div className=" w-[25%] h-24 relative">
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" +
              imageId
            }
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="text-sm w-[70%]">
          <p className="font-bold text-base">{name}</p>
          <p className="flex items-center font-medium text-sm">
            <i className="fi fi-ss-star mt-1 mr-1"></i>
            <span>
              {avgRating} . {slaString} {costForTwoMessage}
            </span>
          </p>
          <p className="line-clamp-1">{cuisines.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchRestaurant;
